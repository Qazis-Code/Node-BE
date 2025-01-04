const employeeModel = require("../employee/employeeModel");
const mongoose = require("mongoose");

var createUserControllerFunction = async (request, response) => {
  try {
    const { name, address, phone } = request.body;

    // Validate input
    if (!name || !address || !phone) {
      return response.status(400).send({
        status: false,
        message: "Missing required fields: name, address, or phone",
      });
    }

    // Create and save the employee
    const employeeModelData = new employeeModel({ name, address, phone });
    await employeeModelData.save();

    response.status(200).send({
      status: true,
      message: "Employee Created!",
      data: employeeModelData, // Optionally return the created employee
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    response.status(500).send({
      status: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

var getUserControllerFunction = async (request, response) => {
  try {
    const employees = await employeeModel.find();

    response.status(200).send({
      status: true,
      message: "Employees retrieved successfully!",
      data: employees,
    });
  } catch (error) {
    response.status(400).send({
      status: false,
      message: "Failed to retrieve employees",
      error: error.message,
    });
  }
};

var deleteUserControllerFunction = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).send({
        status: false,
        message: "Invalid or missing Employee ID",
      });
    }

    const objectId = new mongoose.Types.ObjectId(_id);

    //const objectId = new ObjectId( _id );

    console.log("Attempting to delete employee with _id:", objectId);

    const result = await employeeModel.deleteOne({ _id: objectId });

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return response.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    response.status(200).send({
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    response.status(500).send({
      status: false,
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};

var updateUserControllerFunction = async (request, response) => {
  try {
    const { _id, name, address, phone } = request.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).send({
        status: false,
        message: "Invalid or missing Employee ID",
      });
    }

    const objectId = new mongoose.Types.ObjectId(_id);

    console.log("Attempting to update employee with _id:", objectId);

    const result = await employeeModel.updateOne(
      { _id: objectId },
      { $set: { name: name, address: address, phone: phone } }
    );

    console.log("Update result:", result);

    if (result.matchedCount === 0) {
      return response.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    if (result.modifiedCount === 0) {
      return response.status(200).send({
        status: true,
        message: "No changes made to the employee",
      });
    }

    response.status(200).send({
      status: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    response.status(500).send({
      status: false,
      message: "Failed to update employee",
      error: error.message,
    });
  }
};

module.exports = {
  createUserControllerFunction,
  getUserControllerFunction,
  deleteUserControllerFunction,
  updateUserControllerFunction,
};
