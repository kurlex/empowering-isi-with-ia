"use client";

import React, { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { GrValidate } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import WordCloud from "./components/WordCloud";
import Message from "./components/Message";
import Loader from "./components/Loader";
import supabase from "./lib/supabase/supabaseClient";

enum HomeActionStatusEnum {
  userNotReady,
  userReady,
  userWaitingForAuth,
  userAuthorized,
  userNotAuthorized,
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [homeActionStatus, setHomeActionStatus] =
    useState<HomeActionStatusEnum>(HomeActionStatusEnum.userNotReady);

  const onTypeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmitEmail = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setHomeActionStatus(HomeActionStatusEnum.userWaitingForAuth);
    const urlToRedirectTo = `${window.location.origin}/dashboard`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: urlToRedirectTo },
    });

    setHomeActionStatus(
      error
        ? HomeActionStatusEnum.userNotAuthorized
        : HomeActionStatusEnum.userAuthorized
    );
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-5xl">
          <WordCloud />
          <p className="py-6 text-lg leading-loose">
            Welcome to your event planning assistant! Get real-time support for
            all your event needs. From finding venues to handling logistics, our
            AI is here to help, with live chat and saved conversations for your
            convenience.
          </p>
          {homeActionStatus === HomeActionStatusEnum.userNotReady && (
            <button
              className="btn btn-secondary"
              onClick={() =>
                setHomeActionStatus(HomeActionStatusEnum.userReady)
              }
            >
              Get Started
            </button>
          )}
          {homeActionStatus === HomeActionStatusEnum.userReady && (
            <div className="flex flex-col items-center">
              <input
                className="border w-full py-2 px-3 rounded-md my-4 max-w-md block"
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                onChange={onTypeEmail}
                value={email}
              />

              <button className="btn btn-secondary" onClick={onSubmitEmail}>
                Sign In
              </button>
            </div>
          )}
          {homeActionStatus === HomeActionStatusEnum.userWaitingForAuth && (
            <Loader />
          )}
          {homeActionStatus === HomeActionStatusEnum.userAuthorized && (
            <Message
              icon={<GrValidate />}
              text="A passcode is sent to your email"
            />
          )}
          {homeActionStatus === HomeActionStatusEnum.userNotAuthorized && (
            <Message
              icon={<MdErrorOutline />}
              text="An Error is encountred while sending the passcode"
            />
          )}
        </div>
      </div>
    </div>
  );
}
