import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to verify user authentication
async function verifyUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return null;
  return user;
}

// Health check endpoint
app.get("/make-server-8f03b1ef/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-8f03b1ef/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.json({ error: 'Email, password, name, and role are required' }, 400);
    }
    
    // Only allow admin or viewer roles
    if (role !== 'admin' && role !== 'viewer') {
      return c.json({ error: 'Role must be either admin or viewer' }, 400);
    }
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ 
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        role: data.user.user_metadata.role
      }
    });
  } catch (error) {
    console.log('Signup error in signup route:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Get all devices
app.get("/make-server-8f03b1ef/devices", async (c) => {
  try {
    const devices = await kv.getByPrefix('device:');
    return c.json({ devices: devices || [] });
  } catch (error) {
    console.log('Error fetching devices:', error);
    return c.json({ error: 'Failed to fetch devices' }, 500);
  }
});

// Get single device
app.get("/make-server-8f03b1ef/devices/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const device = await kv.get(`device:${id}`);
    
    if (!device) {
      return c.json({ error: 'Device not found' }, 404);
    }
    
    return c.json({ device });
  } catch (error) {
    console.log('Error fetching device:', error);
    return c.json({ error: 'Failed to fetch device' }, 500);
  }
});

// Add device (admin only)
app.post("/make-server-8f03b1ef/devices", async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const device = await c.req.json();
    const deviceId = device.id || crypto.randomUUID();
    
    await kv.set(`device:${deviceId}`, {
      ...device,
      id: deviceId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true, deviceId });
  } catch (error) {
    console.log('Error adding device:', error);
    return c.json({ error: 'Failed to add device' }, 500);
  }
});

// Update device (admin only)
app.put("/make-server-8f03b1ef/devices/:id", async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existingDevice = await kv.get(`device:${id}`);
    if (!existingDevice) {
      return c.json({ error: 'Device not found' }, 404);
    }
    
    await kv.set(`device:${id}`, {
      ...existingDevice,
      ...updates,
      id,
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error updating device:', error);
    return c.json({ error: 'Failed to update device' }, 500);
  }
});

// Delete device (admin only)
app.delete("/make-server-8f03b1ef/devices/:id", async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Check if user is admin
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const id = c.req.param('id');
    await kv.del(`device:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting device:', error);
    return c.json({ error: 'Failed to delete device' }, 500);
  }
});

// Get thresholds
app.get("/make-server-8f03b1ef/thresholds", async (c) => {
  try {
    const thresholds = await kv.get('thresholds') || {
      tds: { min: 0, max: 500 },
      temperature: { min: 0, max: 35 }
    };
    return c.json({ thresholds });
  } catch (error) {
    console.log('Error fetching thresholds:', error);
    return c.json({ error: 'Failed to fetch thresholds' }, 500);
  }
});

// Update thresholds (admin only)
app.put("/make-server-8f03b1ef/thresholds", async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const thresholds = await c.req.json();
    await kv.set('thresholds', thresholds);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error updating thresholds:', error);
    return c.json({ error: 'Failed to update thresholds' }, 500);
  }
});

// Get alerts
app.get("/make-server-8f03b1ef/alerts", async (c) => {
  try {
    const alerts = await kv.get('alerts') || [];
    return c.json({ alerts });
  } catch (error) {
    console.log('Error fetching alerts:', error);
    return c.json({ error: 'Failed to fetch alerts' }, 500);
  }
});

// Add alert (admin only)
app.post("/make-server-8f03b1ef/alerts", async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const alert = await c.req.json();
    const alerts = await kv.get('alerts') || [];
    
    const newAlert = {
      ...alert,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    alerts.push(newAlert);
    await kv.set('alerts', alerts);
    
    return c.json({ success: true, alert: newAlert });
  } catch (error) {
    console.log('Error adding alert:', error);
    return c.json({ error: 'Failed to add alert' }, 500);
  }
});

Deno.serve(app.fetch);
