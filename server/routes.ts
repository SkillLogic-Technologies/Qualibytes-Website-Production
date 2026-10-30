import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Get programs by type
  app.get("/api/programs/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const programs = await storage.getProgramsByType(type);
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs by type" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Get testimonials by type
  app.get("/api/testimonials/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const testimonials = await storage.getTestimonialsByType(type);
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials by type" });
    }
  });

  // Get all success stories
  app.get("/api/success-stories", async (req, res) => {
    try {
      const stories = await storage.getAllSuccessStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch success stories" });
    }
  });

  // Get team members
  app.get("/api/team", async (req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Get team members by type
  app.get("/api/team/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const team = await storage.getTeamMembersByType(type);
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members by type" });
    }
  });

  // Submit a lead/registration
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create lead" });
      }
    }
  });

  // Get all leads (for admin use)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
