const buildCommandPreview = (inputOptions, noInputOptions) =>
  `nmap [target] ${noInputOptions.map((x) => "-" + x).join(" ")}`

