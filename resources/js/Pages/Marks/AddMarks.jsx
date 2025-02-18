
import React, { useState } from "react";
import Layout from "../Layout/Layout";
import LoadingButton from '../../Shared/LoadingButton'
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import TextInput from "../../Shared/TextInput";
import { usePage } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
const AddMarks = () => {
    const [sending, setSending] = useState(false)
    const [courseCode, setCourseCode] = useState([])

    const [values, setValues] = useState({
        course_title: "",
        course_code: "",
        department: "",
        batch: "",
        session: "",
        student_id: "",
        term: "",
        marks: {},
    });
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setValues((oldValues) => ({
            ...oldValues,
            [key]: value,
        }));
    };
    const handleSelect = (val, key) => {
        if (key === 'course_title') {
            console.log("ddd", key, val);
            const course = courseInfo.find(o => o.course_title === val);
            if (courseCode) {
                let tmpKey = "course_code"
                setValues((oldValues) => ({
                    ...oldValues,
                    [tmpKey]: course?.course_code,
                }));
            }
        }
        setValues((oldValues) => ({
            ...oldValues,
            [key]: val,
        }));
    }

    // useEffect(() => {
    //     const course_code = 
    // }, [values?.course]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`values`, values)
        const mapping = Object.values(values).filter(
            (item) => !item.length && Object.keys(values?.marks).length === 4
        );
        // const mapping = []
        console.log("map", mapping);
        if (mapping.length <= 1) {
            Inertia.post(route("add_marks"), values, {
                onFinish: () => {
                    setValues({
                        course_title: "",
                        course_code: "",
                        department: "",
                        batch: "",
                        session: "",
                        student_id: "",
                        term: "",
                        marks: {},
                    }),
                        toast.success("Save Successfuly!");
                },
                // onError: () => toast.error("Credintial doesn't exist")
            });
        } else {
            toast.error("Field Can't be empty!");
        }
    }
    const department = [
        { value: '', label: 'Select One' },
        { value: 'cse', label: 'CSE' },
        { value: 'eee', label: 'EEE' },
        { value: 'bba', label: 'BBA' },
        { value: 'cen', label: 'CEN' },
        { value: 'tex', label: 'TEX' },
        { value: 'llb', label: 'LLB' },
        { value: 'eng', label: 'ENG' },
    ]
    const batch = [
        { value: '', label: 'Select One' },
        { value: 'cse-16', label: 'CSE-16' },
        { value: 'cse-17', label: 'CSE-17' },
        { value: 'cse-18', label: 'CSE-18' },
        { value: 'cse-19', label: 'CSE-19' },
        { value: 'cse-20', label: 'CSE-20' },
        { value: 'cse-21', label: 'CSE-21' },
        { value: 'cse-22', label: 'CSE-22' },
        { value: 'cse-23', label: 'CSE-23' },
        { value: 'cse-24', label: 'CSE-24' },
        { value: 'cse-25', label: 'CSE-25' },
    ]
    const exam = [
        { value: '', label: 'Select One' },
        { value: 'mid', label: 'Mid' },
        { value: 'final', label: 'Final' },
    ]
    const session = [
        { value: '', label: 'Select One' },
        { value: 'spring-2022', label: 'Spring-2022' },
        { value: 'fall-2022', label: 'Fall-2022' },
        { value: 'summer-2022', label: 'Summer-2022' },
    ]
    const { courseInfo, courseTitles } = usePage().props
    console.log('values', values);
    return (
        <div className="main-div">
            <div className="font-inter-600 text-3xl mb-4 flex gap-4">
                <span>Add Student Mark</span>
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <div className="main-card flex">
                    <div className="main-card__left">
                        <div>
                            <h3 className="font-inter-600 text-md mb-2">Department</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'department')}
                                options={department}
                                singleSelect
                            />
                        </div>
                        <div>
                            <h3 className="font-inter-600 text-md mb-2 mt-2">Batch</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'batch')}
                                options={batch}
                                singleSelect
                            />
                        </div>
                        <div>
                            <h3 className="font-inter-600 text-md mb-2 mt-2">Course Name</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'course_title')}
                                options={courseTitles}
                                singleSelect
                            />
                        </div>
                        <TextInput
                            id="course_code"
                            name="course_code"
                            label="Course Code"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            value={values?.course_code}
                            placeholder="Course Code..."
                        />
                        {/* <div>
                            <h3 className="font-inter-600 text-md mb-2 mt-2">Course Code</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'course_code')}
                                options={courseCode}
                                singleSelect
                            />
                        </div> */}
                        <div>
                            <h3 className="font-inter-600 text-md mb-2 mt-2">Exam</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'term')}
                                options={exam}
                                singleSelect
                            />
                        </div>
                        <div>
                            <h3 className="font-inter-600 text-md mb-2 mt-2">Session</h3>
                            <MultiSelect
                                className="w-full"
                                // defaultValue={flowMap[flowKey]?.trigger?.event}
                                onChange={val => handleSelect(val, 'session')}
                                options={session}
                                singleSelect
                            />
                        </div>

                    </div>
                    <div className="main-card__right">
                        <TextInput
                            id="student_id"
                            name="student_id"
                            label="Student ID"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            // value={values?.name}
                            placeholder="Student ID..."
                        />
                        <TextInput
                            id="ct_mark"
                            name="ct_mark"
                            label="CT Mark"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            // value={values?.name}
                            placeholder="CT Mark..."
                        />
                        <TextInput
                            id="ass_mark"
                            name="ass_mark"
                            label="Assignment Mark"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            // value={values?.name}
                            placeholder="Assignment Mark..."
                        />
                        <TextInput
                            id="written_mark"
                            name="written_mark"
                            label="Written Mark"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            // value={values?.name}
                            placeholder="Written Mark..."
                        />
                        <TextInput
                            id="att_mark"
                            name="att_mark"
                            label="Attendence Mark"
                            type="text"
                            onChange={handleChange}
                            inputClass="profile-textinput-input"
                            inputLabelClass="font-inter-600 text-md"
                            // value={values?.name}
                            placeholder="Attendence Mark..."
                        />
                        <LoadingButton
                            type="submit"
                            loading={sending}
                            className="btn-signup mt-4"
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </div>
            </form>
        </div>
    )
};

AddMarks.layout = (page) => <Layout>{page}</Layout>;
export default AddMarks;
