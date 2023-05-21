const { default: Label } = require("@/components/generic/Label")

const Checkbox = ({ label, checked, onChange, id, ...rest }) => {
  return (
    <Label direction="right" label={label}>
      <input
        id={id ?? label}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded-md border px-3 py-2 outline-none hover:border-primary focus:border-primary"
        {...rest}
      />
    </Label>
  )
}

export default Checkbox
