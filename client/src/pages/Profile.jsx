

import React, { useContext, useEffect, useRef ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActionData, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { getStorage, uploadBytesResumable ,ref,getDownloadURL} from "firebase/storage"
import { app } from '../firebase'
import { signInSuccess, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from 'flowbite-react'
import {toast} from "sonner"


export default function Profile() {

  const {currentUser,error,loading} = useSelector(state => state.user)

  const {url, token} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [imageFile,setImageFile] = useState(null)

  const [imageFileUrl,setImageFileUrl] = useState(null)

  const [imageFileUploading,setImageFileUploading] = useState(false)

  const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null)

  const [imageFileUploadError,setImageFileUploadError] = useState(null)

  const [updatedSuccess, setupdatedSuccess] = useState(null)

  const [updatedError, setupdatedError] = useState(null)

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // handleImageChange
  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if(file)
    {
      setImageFile(file)

      setImageFileUrl(URL.createObjectURL(file))

    }

  }

  useEffect(() => {

    if(imageFile)
    {
      uploadImage()
    }

  },[imageFile])


  // uploadImage
  const uploadImage = () => {

    setImageFileUploading(true)

    setImageFileUploadError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name

    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setImageFileUploadProgress(progress.toFixed(0))

      },
      (error) => {

        setImageFileUploadError('Could not upload image(File must be less than 2MB) ')

        setImageFile(null)

        setImageFileUrl(null)

        setImageFileUploadProgress(null)

        setImageFileUploading(false)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageFileUrl(downloadURL)

          setFormData({...formData, profilePicture:downloadURL})

          setImageFileUploading(false)

        })

      }
    )

  }

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(Object.keys(formData).length === 0 )
    {
        setupdatedError('No changes made')

        return
    }

    if(imageFileUploading)
    {
      setupdatedError('Please wait for the image to finish uploading')

      return
    }

    try
    {
      setupdatedError(null)

       dispatch(updateStart())

       const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData, {headers:{token}})

       if(res.data.success)
       {
          dispatch(updateSuccess(res.data.rest))

          toast.success("profile update successfully")
       }
       else
       {
            console.log(error.message)

            dispatch(updateFailure(res.data.message))
       }

    }
    catch(error)
    {
      console.log(error.message)

      dispatch(updateFailure(error.message))

      setupdatedError(error.message)
    }

  }


  //handleDeleteUser
  const handleDeleteUser = () => {}

  //handleSignout
  const handleSignOut = () => {

    try
    {
      dispatch(signOutSuccess())

      localStorage.removeItem('token')

      toast.success('sign out successfully')

      navigate('/')
    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  return (

    <section className="section max-w-2xl mx-auto">

      <h1 className="title text-center mb-10">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        <input 
          type="file" 
          onChange={handleImageChange}
          accept="image/*"
          ref={filePickerRef}
          hidden
        />

        <div 
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >

          {imageFileUploadProgress && (

            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:"absolute",
                  top:0,
                  left:0
                },
                path:{
                  stoke:`rgba(62, 152, 199 ,${imageFileUploadProgress/100})`
                }
              }}
            />

          )}

          <img 
            src={imageFileUrl || currentUser?.profilePicture}
            alt="user" 
            className={`rounded-full w-fukk h-full object-cover border-8 border-secondaryLight dark:border-secondaryDark 
              ${
                imageFileUploadProgress && 
                imageFileUploadProgress < 100 && 'opacity'
              }`}
          />

        </div>

        {imageFileUploadError && (

          <Alert color="failure">{imageFileUploadError}</Alert>

        )}

        <input 
            type="text" 
            name="username" 
            placeholder='username'
            defaultValue={currentUser?.username}
            onChange={handleChange}
            className="input"
        />

        <input 
          type="email" 
          name="email" 
          placeholder='name@example.com'
          defaultValue={currentUser?.email}
          onChange={handleChange}
          className="input"
        />

        <input 
          type="password" 
          name="passwod" 
          placeholder='*********'
          onChange={handleChange}
          className="input"
        />

        <button 
            className="btn rounded-xl"
            type="submit"
            disabled={loading || imageFileUploading}
        >
          {loading ? 
            (
              <>
                <span className="flex items-center gap-x-3 justify-center">

                        <span className="Loading"/> Loading ...

                </span>
              </>
            ) 
            : 
            ("update")
          }
        </button>

        <div className="text-red-500 flex justify-between mt-5">

          <span onClick={handleSignOut} className="cursor-pointer">
            sign out
          </span>

        </div>

        {updatedSuccess && (

          <Alert color="success" className="mt-5">{updatedSuccess}</Alert>

        )}

        {updatedError && (

          <Alert color="failure" className="mt-5">{updatedError}</Alert>

        )}

      </form>

    </section>
  

  )
}
