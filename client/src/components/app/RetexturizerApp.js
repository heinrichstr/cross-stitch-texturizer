import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ChromePicker } from "react-color";

export default (props) => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));

        const formData = new FormData();

        //create formdata from form entries
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        fetch(`${window.location.protocol}/api/create_texture`, {
            method: 'POST',
            body: formData
      })
      .then(response => response.text())
      .then(data => {
        console.log('Server response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="header">
                <h2>Generate a textured cross stitch pattern from an image</h2>
            </div>

            <div className="column">
                <div className="inputGroup ">
                    <label>Upload Image:</label>
                    <Controller
                        name="image"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input type="file" onChange={(e) => field.onChange(e.target.files[0])} accept="image/jpeg, image/png, image/gif" />
                        )}
                    />
                </div>

                <div className="inputGroup ">
                    <label>Width (in stitches):</label>
                    <Controller
                        name="xSize"
                        control={control}
                        defaultValue="0"
                        render={({ field }) => <input type="number" {...field} />}
                    />
                </div>

                <div className="inputGroup ">
                    <label>Height (in stitches):</label>
                    <Controller
                        name="ySize"
                        control={control}
                        defaultValue="0"
                        render={({ field }) => <input type="number" {...field} />}
                    />
                </div>

                <div className="inputGroup ">
                    <label>AIDA Border Size:</label>
                    <Controller
                        name="padding"
                        control={control}
                        defaultValue="0"
                        render={({ field }) => <input type="number" {...field} />}
                    />
                </div>
            </div>

            <div className="column">
                <div className="inputGroup">
                    <label>AIDA Border Color:</label>
                    <Controller
                        name="color"
                        control={control}
                        defaultValue="#ffffff"
                        render={({ field }) => (
                            <div className="colorPickerContainer">
                                <input className="readonly" type="text" {...field} readOnly />
                                <ChromePicker
                                    color={field.value}
                                    disableAplha="true"
                                    width="100%"
                                    onChange={(color) => field.onChange(color.hex)}
                                />
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="footer">
                <button className="submit" type="submit">
                    Generate
                </button>
            </div>
        </form>
    );
};
