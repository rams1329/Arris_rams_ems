const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const multer = require("multer");
const ExcelJS = require("exceljs");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  // Remove
  // const messages = await req.consumeFlash('info');
  // Use this instead
  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};
// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     try {
//       const customers = await Customer.find({}).limit(22);
//       res.render('index', { locals, messages, customers } );
//     } catch (error) {
//       console.log(error);
//     }
// }

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - Arris",
    description: "Free NodeJs User Management System",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
    dob: req.body.dob,
    Department: req.body.Department,
    empno: req.body.empno,
    porc: req.body.porc,
    status: req.body.status,
    designation: req.body.designation,
    qualification: req.body.qualification,
    yog: req.body.yog,
    doj: req.body.doj,
    aadharno: req.body.aadharno,
    panno: req.body.panno,
    vanno: req.body.vanno,
    pfno: req.body.pfno,
    address: req.body.address,
    remarks: req.body.remarks,
    prevexp: req.body.prevexp,
    arrisexp: req.body.arrisexp,
    totexp: req.body.totexp,
    prevcompname: req.body.prevcompname,
    accno: req.body.accno,
    ifsc: req.body.ifsc,
    bankname: req.body.bankname,
    bankid: req.body.bankid,
    dlname: req.body.dlname,
    dlemail: req.body.dlemail,
    dlph: req.body.dlph,
    ecpname: req.body.ecpname,
    ecpnumber: req.body.ecpnumber,
    image: req.file.filename,
  });

  try {
    // console.log(req.body);
    console.log(req.file);
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Customer Data
 */
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Employee Data",
      description: "Arris",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    // Check if req.file exists and has the filename property
    const imageFilename =
      req.file && req.file.filename ? req.file.filename : "";

    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      dob: req.body.dob,
      Department: req.body.Department,
      empno: req.body.empno,
      porc: req.body.porc,
      status: req.body.status,
      designation: req.body.designation,
      qualification: req.body.qualification,
      yog: req.body.yog,
      doj: req.body.doj,
      aadharno: req.body.aadharno,
      panno: req.body.panno,
      vanno: req.body.vanno,
      pfno: req.body.pfno,
      address: req.body.address,
      remarks: req.body.remarks,
      prevexp: req.body.prevexp,
      arrisexp: req.body.arrisexp,
      totexp: req.body.totexp,
      prevcompname: req.body.prevcompname,
      accno: req.body.accno,
      ifsc: req.body.ifsc,
      bankname: req.body.bankname,
      bankid: req.body.bankid,
      dlname: req.body.dlname,
      dlemail: req.body.dlemail,
      dlph: req.body.dlph,
      ecpname: req.body.ecpname,
      ecpnumber: req.body.ecpnumber,
      details: req.body.details,
      updatedAt: Date.now(),
    };

    // Only add the image field if req.file exists
    if (imageFilename) {
      updateFields.image = imageFilename;
    }

    await Customer.findByIdAndUpdate(req.params.id, updateFields);
    // await res.redirect(`/edit/${req.params.id}`);
    await res.redirect(`/`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

// old one

// exports.deleteCustomer = async (req, res) => {
//   try {
//     await Customer.deleteOne({ _id: req.params.id });
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * Delete /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    // Retrieve the customer details before deleting for confirmation message
    const customer = await Customer.findOne({ _id: req.params.id });

    res.render("customer/confirm-delete", {
      title: "Confirm Deletion",
      description: "Confirm Deletion",
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Confirm Delete Customer Data
 */
exports.confirmDeleteCustomer = async (req, res) => {
  try {
    // Perform the actual deletion
    await Customer.deleteOne({ _id: req.params.id });

    req.flash("info", "Customer has been deleted.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    let queryCondition;

    // Check if searchTerm includes "active" or "inactive" to filter by status
    if (searchTerm.toLowerCase().includes("active")) {
      queryCondition = { status: "Active" };
    } else if (searchTerm.toLowerCase().includes("inactive")) {
      queryCondition = { status: "Inactive" };
    } else {
      // If searchTerm doesn't include "active" or "inactive", search across all fields
      queryCondition = {
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { status: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      };
    }

    const customers = await Customer.find(queryCondition);

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

//arris total employees
exports.arrisPage = async (req, res) => {
  try {
    // Count the total number of employees
    const totalEmployees = await Customer.countDocuments({});

    const locals = {
      title: "Arris Page",
      description: "Total number of employees at Arris",
      totalEmployees: totalEmployees,
    };

    res.render("arris", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Download all data as Excel sheet
 */
exports.downloadData = async (req, res) => {
  try {
    const customers = await Customer.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    // Define headers
    const headers = [
      "First Name", // 15
      "Last Name", // 15
      "Tel", // 10
      "Email", // 20
      "Date of Birth", // 15
      "Department", // 15
      "Employee Number", // 15
      "PORC", // 10
      "Designation", // 15
      "Qualification", // 15
      "Year of Graduation", // 15
      "Date of Joining", // 15
      "Aadhar Number", // 15
      "PAN Number", // 15
      "VAN Number", // 15
      "PF Number", // 15
      "Address", // 20
      "Remarks", // 20
      "Previous Experience", // 20
      "Arris Experience", // 20
      "Total Experience", // 20
      "Previous Company Name", // 20
      "Account Number", // 15
      "IFSC Code", // 15
      "Bank Name", // 15
      "Bank ID", // 15
      "DL Name", // 15
      "DL Email", // 20
      "DL Phone", // 15
      "Emergency Contact Person Name", // 25
      "Emergency Contact Person Number", // 20
      "Details", // 20
      "Updated At", // 15
    ];

    worksheet.addRow(headers);

    // Set column widths
    const columnWidths = [
      15, 15, 15, 20, 15, 15, 15, 10, 15, 15, 15, 15, 15, 15, 15, 15, 20, 20,
      20, 20, 20, 20, 15, 15, 15, 15, 15, 15, 20, 15, 25, 20, 20, 20, 15,
    ];

    worksheet.columns.forEach((column, index) => {
      column.width = columnWidths[index];
    });

    // Add data rows
    customers.forEach((customer) => {
      const rowData = [
        customer.firstName,
        customer.lastName,
        customer.tel,
        customer.email,
        customer.dob,
        customer.Department,
        customer.empno,
        customer.porc,
        customer.designation,
        customer.qualification,
        customer.yog,
        customer.doj,
        customer.aadharno,
        customer.panno,
        customer.vanno,
        customer.pfno,
        customer.address,
        customer.remarks,
        customer.prevexp,
        customer.arrisexp,
        customer.totexp,
        customer.prevcompname,
        customer.accno,
        customer.ifsc,
        customer.bankname,
        customer.bankid,
        customer.dlname,
        customer.dlemail,
        customer.dlph,
        customer.ecpname,
        customer.ecpnumber,
        customer.details,
        customer.updatedAt, // Don't forget to add the updatedAt field
      ];
      worksheet.addRow(rowData);
    });

    // Set content type and disposition for response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customer_data.xlsx"
    );

    // Send the workbook as a response
    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
