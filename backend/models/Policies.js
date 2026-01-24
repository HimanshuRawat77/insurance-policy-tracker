import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    policyHolder: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["Life", "Health", "Vehicle", "Home", "Travel", "Other"],
      default: "Other",
      index: true,
    },

    coverageAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    premium: {
      type: Number,
      required: true,
      min: 0,
    },

    // ---------------- POLICY DATES ----------------
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    gracePeriodDays: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ---------------- RENEWAL & PAYMENT ----------------
    renewalFrequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "One-Time"],
      default: "Yearly",
    },

    nextPremiumDueDate: {
      type: Date,
      index: true,
    },

    autoRenewal: {
      type: Boolean,
      default: false,
    },

    // ---------------- STATUS & REMINDERS ----------------
    status: {
      type: String,
      enum: ["Active", "Expired", "Terminated"],
      default: "Active",
      index: true,
    },

    reminderEnabled: {
      type: Boolean,
      default: true,
    },

    lastReminderSent: {
      type: Date,
    },

    // ---------------- DOCUMENT HEALTH ----------------
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
        uploaded: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // ---------------- CLAIM INSIGHT ----------------
    claimsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ---------------- USER RELATION ----------------
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Policy", policySchema);
