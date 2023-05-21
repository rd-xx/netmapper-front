const buildCommandPreview = (inputOptions, noInputOptions) =>
  `nmap [target] ${inputOptions.map(
    (x) => `-${x.key}=[${x.key}Value]`
  )} ${noInputOptions.map((x) => "-" + x).join(" ")}`

const buildDatetime = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const day = d.getDate().toString().padStart(2, "0")
  const hours = d.getHours()
  const minutes = d.getMinutes()

  return `Terminé le ${day}/${month}/${year} à ${hours}:${minutes}`
}

export { buildCommandPreview, buildDatetime }
