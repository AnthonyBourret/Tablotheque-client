import React from 'react';

interface Props {
    handleChanges: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectOptions: string[];
    inputTitle: string;
    inputName: string;
}

function SelectInputFilter({ handleChanges, selectOptions, inputTitle, inputName }: Props) {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">{inputTitle}</span>
            </div>
            <select
                className="select select-sm select-bordered bg-neutral"
                defaultValue=""
                onChange={handleChanges}
                name={inputName}
            >
                <option value="">-</option>
                {selectOptions.map((option, index) =>
                    <option key={index}>
                        {option}
                    </option>)}
            </select>
        </label>
    );
}

export default SelectInputFilter;