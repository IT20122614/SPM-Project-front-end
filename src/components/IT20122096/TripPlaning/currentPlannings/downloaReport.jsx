import React from "react";
import jsPDF from "jspdf";

export default function DownloaReport({ plan }) {
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  let doc = new jsPDF();
  doc.setFontSize(24);
  doc.text("Package Details", 10, 18);

  doc.setFontSize(15);
  doc.text("Package Name", 15, 28);
  doc.text(plan.name, 60, 28);
  doc.text("Package Type", 15, 35);
  doc.text(plan.type, 60, 35);
  doc.text("No of Days", 15, 42);
  doc.text(plan.noOfDays+"", 60, 42);

  doc.setFontSize(24);
  doc.text("Package Details", 10, 50);
  doc.addImage(
    getBase64Image(plan.accommodation.image),
    "JPEG",
    10,
    55,
    50,
    50
  );

  doc.save("name");
}
