import React from 'react';
import {
    difficultyOptions,
    progressionOptions,
    styleOptions,
    capoOptions,
    tuningOptions
} from "../../utils/InputValues";

// Import Components
import SelectInputFilter from "./SelectInputFilter";

// Import Types
import { FilterProps } from "../../types/types";


function FilterMobile({ setFilters }: FilterProps) {

    // Function to handle the changes in the filters
    function handleChanges(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        // To display the filters, the collapse component (checkbox type) has to be clicked on
        // It will be closed when the title is clicked on again otherwise it will keep the focus
        <div className="collapse collapse-arrow bg-base-100 border border-primary min-[770px]:hidden shadow-xl">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                Filter songs by :
            </div>

            {/* On click the filters will be displayed */}
            <form className="collapse-content flex flex-col items-center gap-4 mt-6">

                {/* Difficulty filter */}
                <SelectInputFilter
                    handleChanges={handleChanges}
                    selectOptions={difficultyOptions}
                    inputTitle="Difficulty"
                    inputName="difficulty"
                />

                {/* Status filter */}
                <SelectInputFilter
                    handleChanges={handleChanges}
                    selectOptions={progressionOptions}
                    inputTitle="Status"
                    inputName="status"
                />

                {/* Style filter */}
                <SelectInputFilter
                    handleChanges={handleChanges}
                    selectOptions={styleOptions}
                    inputTitle="Style"
                    inputName="Styles"
                />

                {/* Tuning filter */}
                <SelectInputFilter
                    handleChanges={handleChanges}
                    selectOptions={tuningOptions}
                    inputTitle="Tuning"
                    inputName="Tuning"
                />

                {/* Capo filter */}
                <SelectInputFilter
                    handleChanges={handleChanges}
                    selectOptions={capoOptions}
                    inputTitle="Capo"
                    inputName="capo"
                />

                {/* Reset filters button */}
                <button
                    type="reset"
                    className="btn btn-md btn-primary w-fit my-4 border border-base-200"
                    onClick={() => setFilters({
                        difficulty: '',
                        status: '',
                        Styles: '',
                        Tuning: '',
                        capo: ''
                    })}
                >
                    Reset filters</button>
            </form>
        </div>
    );
};

export default FilterMobile;