import { useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TableComponent from "./components/Table";
import Modal from "./components/Modal";
import FormComponent from "./components/Form";
import { sendEmail, getAllData } from "./services/apiService";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    body: <></>
  })

  const [tableData, setTableData] = useState([])
  const [selectedData, setSelectedData] = useState([])

  const [loading, setLoading] = useState(false)

  const onClose = () => {
    setIsModalOpen(false)
    setModalData({
      title: '',
      body: <></>
    })
  }

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getAllData()
  
      if (data.error) return

      setTableData(data.data);
      setLoading(false)
    } catch (error) {
    } finally { setLoading(false) }
  }, []);

  const addMoreEntries = async () => {
    setModalData({
      title: 'Add entry',
      body: <FormComponent onClose={onClose} getData={getData} />
    })
    setIsModalOpen(true)
  }

  const sendDataToEmail = async () => {
    if (selectedData.length <= 0) return
    const { data } = await sendEmail(selectedData)

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

  const props = { setIsModalOpen, onClose, setModalData, selectedData, setSelectedData, getData, loading, setLoading, tableData }

  return (
    <>
    <ErrorBoundary fallback={<h1 className="m-0 text-center bg-white">There was an error, please try again later</h1>}>
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
    </ErrorBoundary>
    </>
  );
}

export default App;
