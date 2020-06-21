import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

const Education = () => {
  const { profile } = useSelector(state => state.profile);

  const education = profile.education.map(edu => (
    <tr>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.fieldofstudy}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
