import React, { useEffect, useState } from 'react';
import './StudentCertificate.css';
import axios from 'axios';

export default function StudentCertificate() {
  const [state, setState] = useState(0);

  const [username, setUsername] = useState('');
  const [course, setcourse] = useState('');
  const [certify, setcertify] = useState('');
  const [files, setfiles] = useState(null);
  const [image, setImage] = useState("")
  // const { id } = useParams();

  const formdata = new FormData();
  formdata.append('StudentName', username)
  formdata.append('Course', course)
  formdata.append('CertificateNo', certify)
  formdata.append('img', files)

  function handleDataAdd() {
    axios.post('http://localhost:2400/create', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(alert('data was successfully added'))
      .catch(err => console.log(err));
  }

  const [views, setViews] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:2400/get')
      .then((Res) => {
        setViews(Res.data);
      })
      .catch(err => console.log(err))
  }, [])




  function setEdit(id) {
    localStorage.setItem('id', id);
    axios.get('http://localhost:2400/get/' + id)
      .then(res => {
        setUsername(res.data.StudentName);
        setcourse(res.data.Course);
        setcertify(res.data.CertificateNo);

      })
      .catch(err => console.log(err))
  }

  function handleUpdate() {
    const id = localStorage.getItem('id');

    axios.put('http://localhost:2400/update/' + id, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {

        alert('data was successfully updated')
        localStorage.clear();
        setUsername('');
        setcourse('');
        setcertify('');


      }
      )
      .catch(err => console.log(err));
  }

  function viewEdit(id) {
    localStorage.setItem('id', id);
    axios.get('http://localhost:2400/get/' + id)
      .then(res => {
        console.log(res.data)
        // setgview(res.data)
        setUsername(res.data.StudentName);
        setcourse(res.data.Course);
        setcertify(res.data.CertificateNo);
        setImage(res.data.Cpath)

      })
      .catch(err => console.log(err))
  }

  if (state === 1) {
    return (
      <div >
        <div className='popup'>
          <h4 className='addhead'> <b>Add Certificate</b></h4>


          <div class="form-floating">
            <input type="text" class="form-control" id="floatingPassword" placeholder="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label for="floatingPassword" ><b>Student Name</b></label>
          </div>

          <div class="form-floating">
            <input type="text" value={course} onChange={(e) => setcourse(e.target.value)} class="form-control" id="floatingPassword" placeholder="text" />
            <label for="floatingPassword" ><b>Course</b></label>
          </div>

          <div class="form-floating">
            <input type="text" class="form-control" id="floatingPassword" placeholder="text" value={certify} onChange={(e) => setcertify(e.target.value)} />
            <label for="floatingPassword"><b>Certificate Number</b></label>
          </div>

          <div class="form-floating">
            <input type="file" class="form-control" id="floatingPassword" onChange={(e) => setfiles(e.target.files[0])} placeholder="text" />
            <label for="floatingPassword"><b>Choose File</b></label>
          </div>

          <button className='prime bg-primary' onClick={handleDataAdd}><b>ADD</b></button>
          <button onClick={() => setState()} className='danger'><b>CANCEL</b></button>
        </div>
      </div>

    )
  }

  if (state === 2) {
    return (

      <div>
        <h2>STUDENT CERTIFICATE</h2>    <br />
        <br />
        <img src={`${image}`} />
        <div className='cerview'>
          <h4>NAME :{`${username}`}</h4> <br />
          <h4>COURSE :{`${course}`} </h4> <br />
          <h4>CERTIFICATE NO :{`${certify}`}</h4> <br />
        </div>

      </div>
    )
  }

  return (
    <div>
      <div>
        <h3 className='certifi'><b>STUDENT CERTIFICATE</b></h3>
        <button onClick={() => setState(1)} className='addbtn'><b>ADD CERTIFICATE</b></button>
      </div>

      <div>

        <table id='ttt' class="table table-bordered   border-dark">

          <thead>
            <tr>
              <th>
                S.No
              </th>
              <th>
                NAME
              </th>

              <th>
                Course
              </th>
              <th>
                Certificate
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {
              views.map((items, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{items.StudentName}</td>
                    <td>{items.Course}</td>
                    <td>{items.CertificateNo}</td>
                    <td>
                      <button id='editpen' type="button" onClick={() => {
                        setEdit(items._id)
                      }} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> EDIT</button>



                      < button type="button" id='footer4' class="btn btn-success" onClick={() => {
                        setState(2)
                        viewEdit(items._id)
                      }}>VIEW</button>

                      <button type="button" id='footer2' class="btn btn-dark" onClick={() => {
                        axios.delete(`http://localhost:2400/delete/${items._id}`)
                          .then(() => {
                            window.location.reload();
                          })
                      }}>DELETE</button>


                      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Certificate</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">



                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingPassword" placeholder="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label for="floatingPassword" ><b>Student Name</b></label>
                              </div>

                              <div class="form-floating">
                                <input type="text" value={course} onChange={(e) => setcourse(e.target.value)} class="form-control" id="floatingPassword" placeholder="text" />
                                <label for="floatingPassword" ><b>Course</b></label>
                              </div>

                              <div class="form-floating">
                                <input type="text" class="form-control" id="floatingPassword" placeholder="text" value={certify} onChange={(e) => setcertify(e.target.value)} />
                                <label for="floatingPassword"><b>Certificate Number</b></label>
                              </div>

                              <div class="form-floating">
                                <input type="file" class="form-control" id="floatingPassword" onChange={(e) => setfiles(e.target.files[0])} placeholder="text" />
                                <label for="floatingPassword"><b>Choose File</b></label>
                              </div>
                              <div id='topfooter' class="modal-footer">

                                <button type="button" id='footer1' class="btn btn-primary" onClick={handleUpdate}>UPDATE</button>
                                {/* <button type="button" id='footer2' class="btn btn-dark" data-bs-dismiss="modal">DELETE</button>  */}

                                <button type="button" id='footer3' class="btn btn-danger " data-bs-dismiss="modal" onClick={() => {
                                  localStorage.clear()
                                }}>CANCEL</button>

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                    </td>
                  </tr>
                )
              })
            }







          </tbody>
        </table>
      </div>
    </div>
  )
}
