import { useState } from "react";
import axios from "axios";
import TableComponent from "./components/Table";
import Modal from "./components/Modal";
import FormComponent from "./components/Form";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    body: <></>
  })

  const [selectedData, setSelectedData] = useState([])

  const onClose = () => {
    setIsModalOpen(false)
    setModalData({
      title: '',
      body: <></>
    })
  }

  const addMoreEntries = async () => {
    setModalData({
      title: 'Add entry',
      body: <FormComponent onClose={onClose} />
    })
    setIsModalOpen(true)
  }

  const sendDataToEmail = async () => {
    if (selectedData.length <= 0) return
    const { data } = await axios.post(process.env.REACT_APP_API_URL + 'email/send', { data: selectedData }).catch(err => {})

    if (data.error) return

    setModalData({
      title: 'Success',
      body: <>
        <h2 className="mx-0 my-2">Email sent successfully</h2>
        <div className=" mx-auto mt-4 w-100 d-flex align-items-center justify-content-around">
          <button className="btn-danger btn" onClick={onClose}>OK</button>
        </div>
      </>
    })
    setIsModalOpen(true)
  }

  const props = { setIsModalOpen, onClose, setModalData, selectedData, setSelectedData }

  return (
    <>
      <main className="container-fluid g-0 bg-dark" style={{ height: "100vh" }}>
        <Modal onClose={onClose} show={isModalOpen} modalData={modalData} />
        <h1 className="text-white text-center">The IT Studio Data Table</h1>
        <div className="d-flex align-items-center justify-content-evenly w-100" style={{ height: "80px" }}>
          <button onClick={sendDataToEmail} className="btn btn-warning mx-2 my-1">Send Data</button>
          <button onClick={addMoreEntries} className="btn btn-success mx-2 my-1">Add more entries</button>
        </div>
        <section className="d-flex align-items-center justify-content-center">
          <TableComponent {...props}/>
        </section>
      </main>
    </>
  );
}

export default App;
