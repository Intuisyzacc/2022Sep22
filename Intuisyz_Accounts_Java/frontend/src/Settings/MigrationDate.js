import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  useHistory,
  useLocation,
  Redirect,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './migrationDate.css';
import baseUrl from '../Base Url/baseUrl';
import { successToast, errorToast } from '../common/global';
import { ToastContainer, toast } from 'react-toastify';
import Headers from '../Header/Headers';

const MigrationDate = () => {
  const [startDate, setStartDate] = useState();
  const [startDateFlag, setStartDateFlag] = useState(false);

  if (sessionStorage.getItem('CompanyName') !== null)
  {
    localStorage.setItem('CompanyName',sessionStorage.getItem('CompanyName'));
  }
  if (sessionStorage.getItem('logDetails') !== null)
  {
    localStorage.setItem('logDetails',sessionStorage.getItem('logDetails'));
  }
  if (sessionStorage.getItem('tdsIdVal') !== null)
  {
    localStorage.setItem('tdsIdVal',sessionStorage.getItem('tdsIdVal'));
  }
  if (sessionStorage.getItem('gstIdVal') !== null)
  {
    localStorage.setItem('gstIdVal',sessionStorage.getItem('gstIdVal'));
  }
  if (sessionStorage.getItem('cashIdVal') !== null)
  {
    localStorage.setItem('cashIdVal',sessionStorage.getItem('cashIdVal'));
  }
  if (sessionStorage.getItem('CustId') !== null)
  {
    localStorage.setItem('CustId',sessionStorage.getItem('CustId'));
  }

  let url = baseUrl.url;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const submitFinal = handleSubmit(async (data) => {
    if (startDate === null || startDate === undefined) {
      setStartDateFlag(true);
    } else {
      setStartDateFlag(false);

      if (startDate.getDate() < 10) {
        var currentDay = '0' + startDate.getDate();
      } else {
        var currentDay = startDate.getDate();
      }

      if (startDate.getMonth() + 1 < 10) {
        var currentMonth = '0' + (startDate.getMonth() + 1);
      } else {
        var currentMonth = startDate.getMonth() + 1;
      }

      var sDate =
        startDate.getFullYear() + '-' + currentMonth + '-' + currentDay;

      console.log(`sDate `, sDate);

      axios
        .get(url + `migrationDateAdd?mgrDate=${sDate}`)
        .then((data) => {
          successToast('Migration date updated Successfully');
          localStorage.setItem('migrationDate', sDate);
          // reset();

          //// increase and decrease amount function call
          console.log('data ', data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  let history = useHistory();
  useEffect(() => {
        
  console.log('history.length ',history.length);
    
  if (history.length === 1)
  {
    sessionStorage.setItem('logDetails',localStorage.getItem('logDetails'));
    sessionStorage.setItem('CompanyName',localStorage.getItem('CompanyName'));
    sessionStorage.setItem('tdsIdVal',localStorage.getItem('tdsIdVal'));
    sessionStorage.setItem('gstIdVal',localStorage.getItem('gstIdVal'));
    sessionStorage.setItem('cashIdVal',localStorage.getItem('cashIdVal'));
    sessionStorage.setItem('CustId',localStorage.getItem('CustId'));
  }
  console.log(`sessionStorage.getItem('logDetails') `,sessionStorage.getItem('logDetails'));
  console.log(`sessionStorage.getItem('CompanyName') `,sessionStorage.getItem('CompanyName'));
  console.log(`sessionStorage.getItem('tdsIdVal') `,sessionStorage.getItem('tdsIdVal'));
  console.log(`sessionStorage.getItem('gstIdVal') `,sessionStorage.getItem('gstIdVal'));
  console.log(`sessionStorage.getItem('cashIdVal') `,sessionStorage.getItem('cashIdVal'));
  console.log(`sessionStorage.getItem('CustId') `,sessionStorage.getItem('CustId'));

    if (sessionStorage.getItem('logDetails') === 'true') {
      let mgrDate = localStorage.getItem('migrationDate');

      if (mgrDate !== null && mgrDate !== undefined && mgrDate !== '') {
        let k = mgrDate;
        console.log(k.split('-'));
        let i = new Date(k.split('-')[0], k.split('-')[1] - 1, k.split('-')[2]);
        console.log(i);
        setStartDate(i);
      }
    } else {
      history.push({
        pathname: '/login',
      });
    }
  }, []);

  return (
    <div>
      <Headers />
      <div className="headStyle">
        <h1>Migration Date</h1>
      </div>
      <div className="dateStyle">
        <div>
          <DatePicker
            name="start"
            className="form-control datepicker"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            defaultValue=""
          />
        </div>
        &nbsp; &nbsp; &nbsp;
        <div>
          <input
            type="submit"
            name="submit"
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              e.preventDefault();
              submitFinal();
            }}
            defaultValue="Search"
          />
        </div>
      </div>
      <div className="errMsgStyle">
        <div style={{ color: 'red' }}>
          {startDateFlag && <p>Date is required.</p>}
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default MigrationDate;
