import React, { useState, useEffect } from 'react';

import axiosInstance from '../axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';

function uploadProducts() {
  const [activeTab, setActiveTab] = useState("allTickets");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataToSave, setDataToSave] = useState({ csvStringData: "" });
  const [searchQuery, setSearchQuery] = useState(null);
  const itemsPerPage = 10;
  const [isUpdate, setIsUpdate] = useState(false);
  const [imageLinks, setImageLinks] = useState(['']); // State to hold image links
  const [imageUploading, setImageUploading] = useState(false);
  const [seletedProductId, setSelectedProductId] = useState(null)

  // Fetching products
  const fetchProducts = async (page = 0, query = "") => {
    try {
      const response = await axiosInstance.get("product/getAllProducts", {
        params: { page, query }
      });
      if (response.data.success.status === "200") {
        setData(response.data.dtoList);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      setDataToSave(prevState => ({
        ...prevState,
        csvStringData: text
      }));
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      toast.error("Failed to read the file.");
    };

    if (file) {
      reader.readAsText(file);
    } else {
      toast.error("No file selected.");
    }
  };

  // Handle upload CSV Data To Database
  const handleUploadDataToDB = async () => {
    toast.info("Upload dtest")
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleImageLinkChange = (index, value) => {
    const newImageLinks = [...imageLinks];
    newImageLinks[index] = value; // Update the specific image link
    setImageLinks(newImageLinks);
  };

  // Function to add a new image input
  const addImageInput = () => {
    setImageLinks([...imageLinks, '']); // Add a new empty input for image link
  };

  // Handle modal close
  const handleUpdateHide = () => {
    setIsUpdate(false);
    setImageLinks(['']); // Reset image links when modal is closed
    setSelectedProductId(null)
  };


  const handleOpenDialog = (productId) => {
    setIsUpdate(true)
    setSelectedProductId(productId)
  }

  const uploadProductImages = async () => {
    console.log(imageLinks)
    try {
      const response = await axiosInstance.post(`/product/addImage/${seletedProductId}`, imageLinks);
      // Optionally handle the response if needed
      toast.success("Images uploaded successfully:")
      setIsUpdate(false)
    } catch (error) {
      console.error("Error uploading images:", error);
      // Optionally handle error feedback to the user
    }
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <section className="data-table-bgs_02x24 py-3">
          <div className="container-fluid">
            <div className="table-wrapper tabbed-table">
              <div className="heading-wrapper">
                <h3 className="title">Upload Products File</h3>
              </div>
              <div className="d-flex align-items-center mb-3">
                <input
                  type="file"
                  accept=".csv"
                  className="form-control mr-3"
                  id="customFile"
                  onChange={handleFileUpload}
                />

                {loading ? (
                  <div className='w-25 btn ml-3 rounded'>
                    <div className='loader'></div>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary ml-3 rounded"
                    style={{ flex: '0 0 25%' }}
                    onClick={handleUploadDataToDB}
                  >
                    Upload Products
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="filter-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="search-wrapper">
                  <input
                    type="text"
                    name="search-user"
                    id="searchUsers"
                    className="form-control"
                    placeholder="Search Product by Name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="data-table-bgs_02x24 py-3">
          <div className="container-fluid">
            <div className="table-wrapper tabbed-table">
              <div className="heading-wrapper">
                <h3 className="title">All Products</h3>
              </div>
              <div className="tab-content recent-transactions-tab-body" id="myTabContent">
                <div className="tab-pane fade show active" id="all-transactions-tab-pane" role="tabpanel" aria-labelledby="all-transactions-tab" tabIndex="0">
                  <div className="tickets-table table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="selection-cell-header" data-row-selection="true">
                            <input type="checkbox" className="" />
                          </th>
                          <th tabIndex="0">S.No.</th>
                          <th tabIndex="0">Product Name</th>
                          <th tabIndex="0">Image</th>
                          <th tabIndex="0">Composition</th>
                          <th tabIndex="0">Brand</th>
                          <th tabIndex="0">Treatment</th>
                          <th tabIndex="0">Size</th>
                          <th tabIndex="0">Form</th>
                          <th tabIndex="0">Pills Quantity</th>
                          <th tabIndex="0">Price</th>
                          {/* <th tabIndex="0">Purchase Link</th> */}
                          <th tabIndex="0">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter(item =>
                            searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
                          )
                          .map((item, index) => (
                            <tr key={item.productId}>
                              <td className="selection-cell">
                                <input type="checkbox" />
                              </td>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.image ? <img src={item.image} alt={item.name} /> : "N/A"}</td>
                              <td>{item.composition}</td>
                              <td>{item.brand}</td>
                              <td>{item.treatment}</td>
                              <td>{item.packagingSize}</td>
                              <td>{item.form}</td>
                              <td>{item.pillsQty}</td>
                              <td>{item.price}</td>
                              {/* <td>{item.paymentLink ? <a href={item.paymentLink}>Buy Now</a> : "N/A"}</td> */}
                              <td>
                                <button onClick={(e) => handleOpenDialog(item.productId)}>Upload Images</button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                  </div>
                  <div className="pagination-wrapper">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`btn ${currentPage === index ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handlePageChange(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal for Updating Images */}
      <Modal
        show={isUpdate}
        onHide={handleUpdateHide}
        centered
        size="lg"
      >
        <div className="p-4 bg-white rounded w-100">
          <h4>Upload Product Images</h4>
          <div className="row g-3">
            {imageLinks.map((link, index) => (
              <div key={index} className="col-12">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={link}
                  onChange={(e) => handleImageLinkChange(index, e.target.value)}
                  className="form-control"
                />
              </div>
            ))}
            <div className="col-12 d-flex justify-content-center mt-3">
              <button className="btn btn-secondary" onClick={addImageInput}>
                Add More Images
              </button>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={handleUpdateHide}>
              Close
            </button>
            {imageUploading ? (
              <button className="btn btn-success ms-3" disabled>
                Loading...
              </button>
            ) : (
              <button className="btn btn-success ms-3" onClick={uploadProductImages}>
                Upload Products
              </button>
            )}
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default uploadProducts;
