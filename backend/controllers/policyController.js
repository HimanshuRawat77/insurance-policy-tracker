import Policy from "../models/Policies.js";
export const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch policies",
      error: error.message,
    });
  }
};

/* =====================================================
   @desc    Create a new policy
   @route   POST /api/policies
   @access  Private
===================================================== */
export const createPolicy = async (req, res) => {
  try {
    const {
      policyNumber,
      policyHolder,
      provider,
      type,
      coverageAmount,
      premium,
      startDate,
      endDate,
      status,
    } = req.body;

    // Basic validation
    if (
      !policyNumber ||
      !policyHolder ||
      !provider ||
      !coverageAmount ||
      !premium ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Check for duplicate policy number
    const existingPolicy = await Policy.findOne({ policyNumber });
    if (existingPolicy) {
      return res.status(400).json({
        message: "Policy number already exists",
      });
    }

    const policy = await Policy.create({
      user: req.user.id,
      policyNumber,
      policyHolder,
      provider,
      type,
      coverageAmount,
      premium,
      startDate,
      endDate,
      status,
    });

    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({
      message: "Invalid policy data",
      error: error.message,
    });
  }
};

/* =====================================================
   @desc    Update a policy
   @route   PUT /api/policies/:id
   @access  Private
===================================================== */
export const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    // Ownership check
    if (policy.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized to update this policy",
      });
    }

    // Update only allowed fields
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      {
        policyHolder: req.body.policyHolder,
        provider: req.body.provider,
        type: req.body.type,
        coverageAmount: req.body.coverageAmount,
        premium: req.body.premium,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPolicy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update policy",
      error: error.message,
    });
  }
};

/* =====================================================
   @desc    Delete a policy
   @route   DELETE /api/policies/:id
   @access  Private
===================================================== */
export const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    // Ownership check
    if (policy.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized to delete this policy",
      });
    }

    await policy.deleteOne();

    res.status(200).json({
      message: "Policy deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete policy",
      error: error.message,
    });
  }
};
