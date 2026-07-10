const baseEmailTemplate = ({
  title,
  recipientName,
  message,
  buttonText,
  buttonUrl,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="40" cellspacing="0" style="background:#ffffff;border-radius:10px;">

<tr>
<td>

<h2 style="color:#222;">
Scan & Dine
</h2>

<h3>
${title}
</h3>

<p>
Hi ${recipientName},
</p>

<p>
${message}
</p>

<p style="text-align:center;margin:40px 0;">

<a
href="${buttonUrl}"
style="
background:#16a34a;
color:#fff;
padding:14px 28px;
text-decoration:none;
border-radius:8px;
display:inline-block;
">
${buttonText}
</a>

</p>

<p>
If you didn't request this email, you can safely ignore it.
</p>

<hr>

<p style="font-size:13px;color:#888;">
© ${new Date().getFullYear()} Scan & Dine.
All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

export default baseEmailTemplate;