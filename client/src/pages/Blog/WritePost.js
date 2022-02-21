import React from 'react'
import './WritePost.css'

function WritePost() {
  return (
    <div className="write">
    <img
      className="writeImg"
      src="https://c4.wallpaperflare.com/wallpaper/555/34/486/digital-art-robot-3d-technology-wallpaper-thumb.jpg"
      alt=""
    />
    <form className="writeForm">
      <div className="writeFormGroup">
        <label htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"></i>
        </label>
        <input id="fileInput" type="file" style={{ display: "none" }} />
        <input
          className="writeInput"
          placeholder="Title"
          type="text"
          autoFocus={true}
        />
      </div>
      <div className="writeFormGroup">
        <textarea
          className="writeInput writeText"
          placeholder="Tell your story..."
          type="text"
          autoFocus={true}
        />
      </div>
      <button className="writeSubmit" type="submit">
        Publish
      </button>
    </form>
  </div>
  )
}

export default WritePost