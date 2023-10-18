import React, { useCallback, useEffect, useRef, useState } from 'react';
import FormComponent from './Form';

const TableComponent = (props) => {

  const { setIsModalOpen, setModalData, onClose, selectedData, setSelectedData } = props

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const tableBodyRef = useRef(null)

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getData()
  
      if (data.error) return

      setTableData(data.data);
      setLoading(false)
    } catch (error) {
    } finally { setLoading(false) }
  }, []);
  
  const openUpdateModal = async (entry) => {
    setModalData({
      title: 'Update Data',
      body: <FormComponent data={entry} onClose={onClose} id={entry._id} getData={getData}/>
    })
    setIsModalOpen(true)
  }

  const openDeleteModal = async (entry) => {

    const deleteData = async () => {
      try {
        setLoading(true)
        const { data } = await deleteData(entry._id)
        if (data.error) return
        getData()
        onClose()
      } catch (error) {
        
      } finally {
        setLoading(false)
      }
    }

    setModalData({
      title: 'Delete Data',
      body: <>
        <h2 className="mx-0 my-2">Are you sure you want to delete this entry?</h2>
        <div className=" mx-auto mt-4 w-100 d-flex align-items-center justify-content-around">
          <button className="btn-danger btn" onClick={deleteData}>Delete</button>
          <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        </div>
      </>
    })
    setIsModalOpen(true)
  }

  const handleCheckBox = (entry) => {
    if (!selectedData.some(e => (e._id === entry._id))) {
      setSelectedData(prev => ([...prev, ...tableData.filter(e => e._id === entry._id)]))
    } else {
      setSelectedData(prev => ([...prev.filter(e => e._id !== entry._id)]))
    }
  }

  const handleAllCheckBox = (e) => {
    e.target.checked ? setSelectedData(tableData) : setSelectedData([])
    if (tableBodyRef?.current?.children.length > 0) {
      const collection = tableBodyRef.current.children
      for (let item of collection) {
        const tr = item
        const td = tr.children.item(0)
        const checkBox = td.children.item(0)
        checkBox.checked = e.target.checked
      }
    }
  }

  useEffect(() => {
    getData()
  }, [getData])
  
  return !loading ? (
    <table className="table table-dark table-striped text-light w-75 m-0">
      <thead>
        <tr>
          <th className='text-center' scope="col">
            <input type="checkbox" onClick={e => handleAllCheckBox(e)}/>
          </th>
          <th className='text-center' scope="col">ID</th>
          <th className='text-center' scope="col">Name</th>
          <th className='text-center' scope="col">Phone Number</th>
          <th className='text-center' scope="col">Email</th>
          <th className='text-center' scope="col">Hobbies</th>
          <th className='text-center' scope="col">Actions</th>
        </tr>
      </thead>
      <tbody ref={tableBodyRef}>
        { tableData.length > 0 ? (
            tableData.map((entry, index) => {
              return (         
                <tr key={entry._id}>
                  <td className='text-center' >
                    <input type="checkbox" onClick={() => handleCheckBox(entry)}/>
                  </td>
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-center'>{entry.name}</td>
                  <td className='text-center'>{entry.phoneNumber}</td>
                  <td className='text-center'>{entry.email}</td>
                  <td className='text-center'>{entry.hobbies}</td>
                  <td className='text-center'>
                    <div className="btn-group">
                      <button className="btn btn-primary mr-2" onClick={() => openUpdateModal(entry)}>Update</button>
                      <button className="btn btn-danger" onClick={() => openDeleteModal(entry)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : null
        }
      </tbody>
    </table>
  ) : <h3 className="m-0 text-white">Loading...</h3> 
};

export default TableComponent;