import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExperince } from '../../redux';
import Moment from 'react-moment';
import moment from 'moment';

const Experience = () => {
  const { profile } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const experience = profile.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteExperince(exp._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
