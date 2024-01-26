"use client";

import {
  useLazyUpdateSessionQuery,
  useUploadAvatarMutation,
} from "@/globalStore/api/userApi";
import { useAppDispatch, useAppSelector } from "@/globalStore/hooks";
import { setUser } from "@/globalStore/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UploadAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();
  const [
    updateSession,
    { data, isSuccess: isSuccessSession, isLoading: isLoadingSession, error: errorSession },
  ] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user?.avatar?.url);
    }
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (errorSession && "data" in errorSession) {
      //@ts-ignore
      toast.error(errorSession?.data?.message);
    }
    if (isSuccess) {
      //@ts-ignore
      updateSession();
      router.refresh();
    }

    if (isSuccessSession) {
        toast.success("Updated successfully");
        router.refresh()
    }
  }, [user, error, isSuccess, errorSession, isSuccessSession]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
        setAvatarPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { avatar };
    uploadAvatar(userData);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-12">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Upload Avatar</h2>

          <div className="form-group">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <figure className="avatar item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="image"
                  />
                </figure>
              </div>
              <div className="input-foam">
                <label className="form-label" htmlFor="customFile">
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="images/*"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="form-btn w-100 py-2" disabled={isLoading}>
            {!isLoading ? "Upload Image" : <div className="lds-dual-ring"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadAvatar;
