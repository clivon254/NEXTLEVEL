


import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css' 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Alert } from 'flowbite-react'


export default function AddProduct() {
  
   const {url,token} = useContext(StoreContext)

   const [files,setFiles] = useState([])

   const [uploading, setUploading] = useState(false)

   const [imageUploadProgress, setImageUploadProgress] = useState(null)

   const [imageUploadError, setImageUploadError] = useState(null)

   const [publishError, setPublishError] = useState(null)

   const [loading, setloading] = useState(false)

   const [formData, setFormData] = useState({
    images:[]
   })

   const navigate = useNavigate()

   console.log(formData)

    //  handleImageSubmit
    const handleImageSubmit = (e) => {
      if (files.length > 0 && files?.length + formData?.images.length < 7) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
  
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              images: formData.images.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)');
            setUploading(false);
          });
      } else {
        setImageUploadError('You can only upload 6 images per listing');
        setUploading(false);
      }
    };

    //  storeImage
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            setImageUploadProgress(progress.toFixed(0))
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // handleRemoveImage
   const handleRemoveImage = (index) => {

    setFormData({
      ...formData,
      images:formData?.images?.filter((_,i) => i !== index)
    })


   }


  //  handleSubmit
  const handleSubmit = async (e) => {
   
    e.preventDefault()

    try
    {

      setloading(true)

      const res = await axios.post(url + "/api/product/create-product",formData,{headers:{token}})

      if(res.data.success)
      {
        toast.success(`${res.data.product.name} is added successfully `)

        navigate(`/product/${res.data.product._id}`)
        
        setloading(false)

        setPublishError(null)
      }
      else
      {
        console.log(res.data.message)
        
        setPublishError(res.data.message)

        setloading(false)
      }

    }
    catch(error)
    {
      console.error(error.message)

      setloading(false)

      setPublishError(error.message)
    }

  }


  // addsize
  const addSizes = (size) => {

    setFormData((prev) => {

      const newSizes = prev.sizes || []

      if(newSizes.includes(size))
      {
        return { ...prev, sizes: newSizes.filter((s) => s !== size) };
      }
      else
      {
        return { ...prev, sizes: [...newSizes, size] };
      }

    })
  }
  
  return (
    
   <section className="section">

    <h2 className="title text-center mb-10">Add Product</h2>

    <form onSubmit={handleSubmit} className="w-full max-w-2xl lg:max-w-5xl mx-auto flex flex-col lg:flex-row gap-x-10 gap-y-4">

      <div className="w-full lg:w-[60%] flex flex-col gap-y-4 ">

        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-x-3 items-center">

          <input 
              type="text" 
              className="input"
              placeholder='name'
              onChange={(e) => setFormData({...formData, name:e.target.value})}
              value={formData.name}
              required
          />

          <input 
              type="number" 
              className="input"
              placeholder='instock'
              onChange={(e) => setFormData({...formData, instock:e.target.value})}
              value={formData.instock}
              required
          />

          <input 
              type="number" 
              className="input"
              placeholder='wholesalePrice'
              onChange={(e) => setFormData({...formData, wholesalePrice:e.target.value})}
              value={formData.wholesalePrice}
              required
          />

          <input 
              type="number" 
              className="input"
              placeholder='regularPrice'
              onChange={(e) => setFormData({...formData, regularPrice:e.target.value})}
              value={formData.regularPrice}
              required
          />

          <input 
              type="number" 
              className="input"
              placeholder='discountPrice'
              onChange={(e) => setFormData({...formData, discountPrice:e.target.value})}
              value={formData.discountPrice}
              required
          />

          <select  
              className="input"
              onChange={(e) => setFormData({...formData, tag1:e.target.value})}
              value={formData.tag1}
              required
          >

            <option value="">choose gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="unisex">unisex</option>

          </select>

          <select  
              className="input"
              onChange={(e) => setFormData({...formData, tag2:e.target.value})}
              value={formData.tag2}
              required
          >

            <option value="">choose wear</option>

            <option value="Topwear">Topwear</option>

            <option value="Bottomwear">Bottomwear</option>

            <option value="any">any</option>

          </select>

          {/* sizes */}
          <div className="space-y-2">

            <p className="font-semibold text-sm">select the availble sizes</p>

            <div className="flex items-center gap-x-2">

              <div onClick={() => addSizes("S")}>

                <p className={`size ${formData.sizes?.includes("S") ? "size-active":""}`}> S</p>

              </div>

              <div onClick={() => addSizes("M")}>

                <p className={`size ${formData.sizes?.includes("M") ? "size-active":""}`}> M</p>

              </div>

              <div onClick={() => addSizes("L")}>

                <p className={`size ${formData.sizes?.includes("L") ? "size-active":""}`}> L</p>

              </div>

              <div onClick={() => addSizes("XL")}>

                <p className={`size ${formData.sizes?.includes("XL") ? "size-active":""}`}> XL</p>

              </div>

              <div onClick={() => addSizes("XXL")}>

                <p className={`size ${formData.sizes?.includes("XXL") ? "border-2 border-black  dark:border-secondaryDark":""}`}> XXL</p>

              </div>

            </div>

          </div>
          
        </div>

        <div className="">

          <ReactQuill 
            theme='snow'
            placeholder="write something"
            className="h-60 mb-20"
            required
            onChange={(value) => {
              setFormData({...formData, description:value})
            }}
          />

        </div>

      </div>

      <div className="lg:w-[40%] flex flex-col gap-y-4">
        
        {/* uplpoad images */}
        <div className="flex items-center justify-between">

          <input 
            type="file" 
            accept='image/*'
            className="input" 
            multiple
            required
            onChange={(e) => setFiles(e.target.files)}
          />

          <button 
            type="button"
            disabled={uploading}
            onClick={handleImageSubmit}
            className="btn2 rounded-full grid place-content-center"
          >
            
            {uploading ? 
              <div className="w-12 h-12 rounded-full">

                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}`}
                />

              </div>
              :
              'upload'
          }

          </button>

          {imageUploadError && (

              <Alert color="failure">{imageUploadError}</Alert>

          )}

        </div>

        {formData?.images?.length > 0 && (

          formData?.images?.map((url,index) => (

            <div 
              key={url}
              className="flex items-center justify-between"
            >

              <img src={url} alt="" className="h-20  w-20" />

              <button 
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700 uppercase hover:opcaity-75 "
              >
                Delete
              </button>

            </div>

          ))

        )}

        <button 
            type="submit"
            disabled={loading || uploading}
            className="btn rounded-xl"
        >
          {loading ? 
          (
            <>
                <span className="flex items-center gap-x-3 justify-center">

                        <span className="Loading"/> Adding ...

                </span>
              </>
          ) 
          : 
          ("Add product")}
        </button>

        {publishError && (

          <Alert color="failure">{publishError}</Alert>

        )}

      </div>

    </form>

   </section>

  )

}
