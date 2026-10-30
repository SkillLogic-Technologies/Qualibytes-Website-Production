import {
  type User,
  type InsertUser,
  type TeamMember,
  type InsertTeamMember,
  type Program,
  type InsertProgram,
  type Testimonial,
  type InsertTestimonial,
  type SuccessStory,
  type InsertSuccessStory,
  type Lead,
  type InsertLead,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMembersByType(type: string): Promise<TeamMember[]>;

  getAllPrograms(): Promise<Program[]>;
  getProgramsByType(type: string): Promise<Program[]>;

  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByType(type: string): Promise<Testimonial[]>;

  getAllSuccessStories(): Promise<SuccessStory[]>;

  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private teamMembers = new Map<number, TeamMember>();
  private programs = new Map<number, Program>();
  private testimonials = new Map<number, Testimonial>();
  private successStories = new Map<number, SuccessStory>();
  private leads = new Map<number, Lead>();
  private currentId = 1;

  constructor() {
    this.seedTeam();
  }

  private seedTeam() {
    const leaders: InsertTeamMember[] = [
      {
        name: "Akshit Giri",
        position: "CEO & Founder of Qualibytes",
        bio: "Founder and visionary leader of Qualibytes.",
        imageUrl: "/akshit.jpg", //  image exists
        type: "leadership",
      },
      {
        name: "Deepanshu Giri",
        position: "Co-Founder & COO of Qualibytes",
        bio: "Co-founder supporting strategy and growth.",
        imageUrl: "/deepanshu.jpeg", //  NO IMAGE
        type: "leadership",
      },
      {
        name: "Aditi",
        position: "Operations Head",
        bio: "Leads operations and execution.",
        imageUrl: "/aditi.png",
        type: "leadership",
      },
    ];

    leaders.forEach((m) => {
      const id = this.currentId++;
      this.teamMembers.set(id, {
        ...m,
        id,
        imageUrl: m.imageUrl ?? null,
      });
    });
  }

  async getUser(id: number) {
    return this.users.get(id);
  }

  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(
      (u) => u.username === username
    );
  }

  async createUser(user: InsertUser) {
    const id = this.currentId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async getAllTeamMembers() {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMembersByType(type: string) {
    return Array.from(this.teamMembers.values()).filter(
      (m) => m.type === type
    );
  }

  async getAllPrograms() {
    return Array.from(this.programs.values());
  }

  async getProgramsByType(type: string) {
    return Array.from(this.programs.values()).filter((p) => p.type === type);
  }

  async getAllTestimonials() {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByType(type: string) {
    return Array.from(this.testimonials.values()).filter(
      (t) => t.type === type
    );
  }

  async getAllSuccessStories() {
    return Array.from(this.successStories.values());
  }

  async createLead(lead: InsertLead) {
    const id = this.currentId++;
    const newLead: Lead = {
      ...lead,
      id,
      name: lead.name ?? null,
      email: lead.email ?? null,
      phone: lead.phone ?? null,
      program: lead.program ?? null,
      source: lead.source ?? "website",
      createdAt: new Date(),
    };
    this.leads.set(id, newLead);
    return newLead;
  }

  async getAllLeads() {
    return Array.from(this.leads.values());
  }
}

export const storage = new MemStorage();
