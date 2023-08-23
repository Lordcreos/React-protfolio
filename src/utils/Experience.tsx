import React from 'react';

export interface IExperience {
  company: string;
  experience: string;
  list: string[];
  designation: string;
}

export type ExperienceArray = IExperience[];

const ExperiencesList = ({experiences}: {experiences: ExperienceArray}) => {

  return (
    <div>
      {experiences.map(exp => {
        return (
            <div className="experience">
            <div className="title">

                <h2 className="companyname ">
                    {exp.company} ( <small>{exp.experience}</small> )
            </h2>
                <p>{exp.designation}</p>
            </div>

            <ul>
                {
                    exp.list.map((item, idx) => (
                        <li key={idx}><span className="text-primary">&#x25B6;</span>{item}.</li>
                    ))
                }
            </ul>
        </div>
        );
      })}
    </div>
  );

}


export default ExperiencesList;