const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
exports.generateInvoicePDF = async (invoiceData) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      timeout: 120000, // 120 seconds
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000); // 120 seconds
    page.setDefaultTimeout(120000); // 120 seconds

    const totalAmount = invoiceData.products.reduce((total, product) => total + product.qty * product.rate, 0);
    const gst = totalAmount * 0.18;
    const grandTotal = totalAmount + gst;
    const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: auto;
            border: 1px solid #eee;
            padding: 20px;
          }
          h1 {
            text-align: left;
            margin-bottom: 5px;
          }
          p {
            margin-top: 0;
            font-size: 12px;
            color: #666;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header img {
            height: 50px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            margin-top: 3rem;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .bold{
            font-size:"12px";
            font-weight: bold;

          }
          th {
            background-color: #f2f2f2;
          }
          .text-right {
            text-align: right;
          }
          #qty{
            color: #007bff;
          }
          .box{
            display: flex;
            /* justify-content: space-between; */
            align-items: end;
            justify-content: end;
            /* border: 1px solid red; */
          }
          .totals {
            border-top: 2px solid #eee;
            padding-top: 10px;
            margin-top: 3rem;
            width: 50%;
            /* border: 1px solid red; */
          }
          .totals div {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            margin-top:  1.2rem;
       
          }
          .totals .label {
            font-weight: bold;
          }
          .totals .grand-total {
            color: #007bff;
            font-size: 18px;
          }
    
          .total-box{
            border-top: 2px solid #cec8c8;
            border-bottom: 2px solid #cec8c8;
            padding: 1rem 0rem !important;
          }
    
          .bottom{
            margin-top: 6rem;
          }
          .footer{
            margin-top: 2rem;
            text-align: start;
            font-size: 18px;
            padding: 1.5rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 50px;
            background-color: #1a1919;
          }
          .footer p{
            /* margin-left: 2rem; */
            color: #fff;
            font-size: 14px;
            padding-top: 5px;
            
          }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>INVOICE GENERATOR</h1>
                <img src="cid:logo" alt="levitation infotech">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoiceData.products
                      .map(
                        (product) => `
                        <tr>
                            <td class="bold">${product.name}</td>
                            <td class="text-right" id="qty">${product.qty}</td>
                            <td class="text-right">${product.rate}</td>
                            <td class="text-right">INR ${(product.qty * product.rate).toFixed(2)}</td>
                        </tr>
                      `
                      )
                      .join('')}
                </tbody>
            </table>
            <div class="box"> <div class="totals">
                <div>
                    <span class="label">Total:</span>
                    <span>INR ${totalAmount.toFixed(2)}</span>
                </div>
                <div>
                    <span class="label">GST:</span>
                    <span>18%</span>
                </div>
                <div class="total-box">
                    <span class="label grand-total">Grand Total:</span>
                    <span class="grand-total">₹ ${grandTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
           <div class="bottom">
            <p>Valid until: 12/04/23 </p>
            <div class="footer">
                <p>Terms and Conditions</p>
                <p>we are happy to supply any further information you may need and trust that you call on us to fill your order. which will receive our prompt and careful attention</p>
            </div>
        </div>
        </div>
    </body>
    </html>
    `;

    await page.setContent(invoiceHtml, { waitUntil: 'networkidle0' }); // Wait until no network connections for at least 500 ms
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error(`Error occurred while generating PDF: ${error.message}`, error);
    throw error;
  }
};
