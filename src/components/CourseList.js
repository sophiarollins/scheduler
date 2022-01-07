import { getCourseTerm, terms } from '../utilities/times.js';
import React, { useState } from 'react';
import Course from './Course.js';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';


const TermButton = ({ term, setTerm, checked }) => (
    <>
        <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
            onChange={() => setTerm(term)} />
        <label class="btn btn-success m-1 p-2" htmlFor={term}>
            {term}
        </label>
    </>
);

const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
        Sign In
    </button>
);

const SignOutButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signOut()}>
        Sign Out
    </button>
);

const TermSelector = ({ term, setTerm }) => {
    const [user] = useUserState();
    return(
    <div className="btn-toolbar justify-content-between">
        <div className="btn-group">
            {
                Object.values(terms).map(
                    value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
                )
            }
        </div>
        {user ? <SignOutButton /> : <SignInButton />}
    </div>
  );
};

const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

    return (
        <>
            <TermSelector term={term} setTerm={setTerm} />
            <div className="course-list">
                {termCourses.map(course => <Course key={course.id} course={course} selected={selected} setSelected={setSelected} />)}
            </div>
        </>
    );
};

export default CourseList;