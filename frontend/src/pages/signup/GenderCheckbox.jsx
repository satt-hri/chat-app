const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex  justify-center">
      <div className="form-control">
        <label className={"label gap-2 cursor-pointer selected"}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            onChange={() => onCheckboxChange("male")}
            checked={selectedGender === "male"}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer selected">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            onChange={() => onCheckboxChange("female")}
            checked={selectedGender === "female"}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
