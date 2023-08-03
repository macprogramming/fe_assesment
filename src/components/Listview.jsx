import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import userJson from '../celebraties.json';

const Listview = () => {
  const [users, setUsers] = useState([]);
  const [cloneUSer, setCloneUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [editUserClone, setEditUserClone] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    "id": null,
    "first": "",
    "last": "",
    "dob": "",
    "gender": "",
    "email": "",
    "picture": "",
    "country": "",
    "description": ""
  });
  const [userCloneObj, setUserCloneObj] = useState({
    "id": null,
    "username": "",
    "dob": "",
    "gender": "",
    "email": "",
    "picture": "",
    "country": "",
    "description": ""
  });
 const gender = ['Male','Female','Rather Not Say'];
  useEffect(() => {
    loadUserApi()
  },[])
  const loadUserApi = () => {
    setUsers(userJson)
    setCloneUsers(userJson)
  }
  const renderAge = (dob) => {
    var dob = new Date(dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  }
  const filterUser = (e) => {
    if (e.target.value.length >= 3) {
      const user = cloneUSer.filter( element => element.first.toUpperCase().includes(e.target.value.toUpperCase()))
      setUsers(user)
    } else {
      setUsers(cloneUSer)
    }
  }

  const deleteSelectedUser = (id) => {
    setDeleteUser(id)
    setModalShow(true)
  }

  const userDelete = () => {
    const user = cloneUSer.filter( (element, i) => element.id !== deleteUser);
    setUsers(user)
    setModalShow(false)
  }
  /*
  {
		"id": 19,
		"first": "Emile",
		"last": "Miller",
		"dob": "2009-02-03",
		"gender": "male",
		"email": "emile.miller@example.com",
		"picture": "https://randomuser.me/api/portraits/med/men/24.jpg",
		"country": "Canada",
		"description": "This character description generator will generate a fairly random description of a belonging to Emile Miller. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details of Emile Miller."
	}
  */
  const editUser = (id) => {
    setIsEdit(true)
    const user = cloneUSer.filter( (element, i) => element.id === id);
    setUserCloneObj({
      "id": user[0].id,
      "username": user[0].first + ' ' + user[0].last,
      "dob": user[0].dob,
      "gender": user[0].gender,
      "email": user[0].email,
      "picture": user[0].picture,
      "country": user[0].country,
      "description": user[0].description
    })
    setEditUserClone(user)
  }

  const cancelEdit = () => {
    setIsEdit(false)
  }
  const handleInput = (e) => {
    let { id, username, dob, gender, email, picture, country, description } = userCloneObj;
    if(e.target.id === 'username'){
      username = e.target.value;
    } else if (e.target.id === 'gender') {
      gender = e.target.value;
    } else if (e.target.id === 'description') {
      description = e.target.value;
    }
    setUserCloneObj({
      "id": id,
      "username": username,
      "dob": dob,
      "gender": gender,
      "email": email,
      "picture": picture,
      "country": country,
      "description": description
    })
    // console.log(userObj)
  }
  const updateUSerData = () => {
    const { id, username, dob, gender, email, picture, country, description } = userCloneObj;
    let user;
    let replaceUSer = [];
    // if (username !== undefined) {
      user = username.split(" ");
      
      let obj = {
        "id": id,
        "first": user[0],
        "last": user[1],
        "dob": dob,
        "gender": gender,
        "email": email,
        "picture": picture,
        "country": country,
        "description": description
      }
      replaceUSer.push(obj)
    // }
    
    let cloneUser = users.map(obj => replaceUSer.find(o => o.id === obj.id) || obj);
    setUsers(cloneUser)
    setIsEdit(false)
  }
  return(
    <>
      {!isEdit ? 
      <div className="card">
        <div className="card-body">
          <h6>List View</h6>
          <div className="form-group d-flex align-items-center">
            <i className="fa fa-search text-secondary position-absolute" style={{ left: '22px', fontSize: '14px', top: '53px' }} />
            <input type="text" className="form-control form-control-sm px-4" placeholder="Search user" onChange={filterUser} />
          </div>
          <div className="accordion my-4" id="accordionExample">
            {
              users.map((user, i) => {
                return(
                  <div className="accordion-item mb-3" key={i}>
                    <h5 className="accordion-header" id={`user${i}`}>
                      <div className="d-flex">
                        <button className="accordion-button bg-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls="collapseOne">
                        <img src={user.picture} className="img img-circle" />
                        &nbsp;&nbsp;&nbsp;<h5>{user.first} {user.last}</h5>
                        </button>
                      </div>
                    </h5>
                    <div id={`collapse${i}`} className="accordion-collapse collapse" aria-labelledby={`user${i}`} data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="row row-cols-3 row-cols-lg-3 g-2 g-lg-3">
                          <div className="col">
                            <p className="m-0 text-secondary">Age</p>
                            <p className="m-0">{renderAge(user.dob)}</p>
                          </div>
                          <div className="col">
                            <p className="m-0 text-secondary">Gender</p>
                            <p className="m-0">{user.gender}</p>
                          </div>
                          <div className="col">
                            <p className="m-0 text-secondary">Country</p>
                            <p className="m-0">{user.country}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12">
                            <p className="m-0 text-secondary">Description</p>
                            <p className="m-0">{user.description}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="text-end">
                              <button type="button" className="text-danger btn" title="Delete" onClick={() => deleteSelectedUser(user.id)}><i className="fa-solid fa-trash-can"></i></button>
                              <button type="button" className="btn text-primary" title="Edit" onClick={() => editUser(user.id)}><i className="fa-solid fa-pen"></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div> : 
      <div className="card">
        <div className="card-body">
          <h6>Edit View</h6>
          <div className="accordion my-4" id="accordionEditExample">
            {/* {
              editUserClone.map((user,i) => {
                return(
                  <> */}
                  <div className="accordion-item mb-3">
                    <h5 className="accordion-header" id='userEdit'>
                      <div className="d-flex">
                        <button className="accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUserEdit" aria-expanded="false" aria-controls="collapseOne">
                        <img src={userCloneObj.picture} className="img img-circle" />
                        &nbsp;&nbsp;&nbsp;<h5>
                          <input type="text" className="form-control" id="username" onChange={handleInput} value={userCloneObj.username} />
                        </h5>
                        </button>
                      </div>
                    </h5>
                    <div id="collapseUserEdit" className="accordion-collapse collapse show" aria-labelledby="userEdit" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="row row-cols-3 row-cols-lg-3 g-2 g-lg-3">
                          <div className="col">
                            <p className="m-0 text-secondary">Age</p>
                            <input className="form-control" disabled value={`${renderAge(userCloneObj.dob)} Years`} />
                          </div>
                          <div className="col">
                            <p className="m-0 text-secondary">Gender</p>
                            <select className="form-select" id="gender" onChange={handleInput}>
                              {gender.map((txt) => {
                                return(
                                  <option value={txt} selected={userCloneObj.gender.toUpperCase() === txt.toUpperCase() ? true : false}>{txt}</option>
                                )
                              })}
                              {/* <option>{userCloneObj.gender}</option> */}
                            </select>
                          </div>
                          <div className="col">
                            <p className="m-0 text-secondary">Country</p>
                            <input className="form-control" disabled value={userCloneObj.country} />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12">
                            <p className="m-0 text-secondary">Description</p>
                            <textarea class="form-control" placeholder="Leave a comment here" id="description" onChange={handleInput} style={{ height: '150px' }} value={userCloneObj.description}>
                              {userCloneObj.description}
                            </textarea>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="text-end">
                              <button type="button" className="text-danger btn btn-lg p-1 px-4" title="Cancel" onClick={cancelEdit}><i className="far fa-times-circle"></i></button>
                              <button type="button" className="btn text-success btn-lg ml-4 p-0" onClick={updateUSerData} title="Save"><i className="far fa-check-circle"></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </>
                )
              })
            } */}
          </div>
        </div>
      </div>
      }

      <Modal
        // {...props}
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title" id="deleteModakLabel">Are your sure you want to delete?</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button type="button" className="btn btn-outline-secondary" onClick={() => setModalShow(false)}>Cancel</button>
          <button type="button" className="btn btn-orange" onClick={userDelete}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Listview;
