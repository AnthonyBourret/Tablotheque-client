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


function FilterDesktop({ setFilters }: FilterProps) {

    // Function to handle the changes in the filters
    function handleChanges(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className="hidden min-[770px]:flex flex-col rounded-box w-64 gap-4 bg-base-100 p-4 border border-primary h-fit shadow-xl">
            <h2 className="font-semibold">Show songs by :</h2>

            {/* A form is used for the filters to use a reset type button */}
            <form className="flex flex-col w-full items-center gap-2">

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
                    className="btn btn-primary w-fit my-4 border border-base-200"
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

export default FilterDesktop;