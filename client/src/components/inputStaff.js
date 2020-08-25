import React,{Fragment,useState} from "react";
const InputStaff=()=>{

    const [fullname,setfullname]=useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [dateofbirth, setdateofbirth] = useState("");

    const onSubmitForm =async e=>{
        e.preventDefault();
        try {
            const body = { fullname, email ,phone,address,dateofbirth};
            const response = await fetch("http://localhost:3000/staff",{
                method:"POST",
                headers:{"Content-Type":"application/json"},body:JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
      <Fragment>
        <h1 className="text-center my-5">Input Staff</h1>
        <from onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Phone"
            className="form-control"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Date Of birth"
            className="form-control"
            value={dateofbirth}
            onChange={(e) => setdateofbirth(e.target.value)}
          ></input>
          <button className="btn btn-success">Add</button>
        </from>
      </Fragment>
    );
}
export default InputStaff;