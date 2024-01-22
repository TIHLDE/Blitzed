'use client';

import React, { useEffect } from 'react';
import { createSession, getSessionById, fetchSessions, updateSession, deleteSession } from '@/app/api/session';

export default function Footer() {
  useEffect(() => {
    const testAPIFunctions = async () => {
      // Test createSession
      const sessionData = {
        start_time: '2022-01-01T12:00:00',
        end_time: '2022-01-01T14:00:00',
      };
      try {
        const createdSession = await createSession(sessionData);
        console.log('Created Session:', createdSession);
      } catch (error) {
        console.error('Error creating session:', error);
      }

      // Test getSessionById
      const sessionId = 5; // Replace with a valid session ID
      try {
        const session = await getSessionById(sessionId);
        console.log('Fetched Session by ID:', session);
      } catch (error) {
        console.error('Error fetching session by ID:', error);
      }

      // Test fetchSessions
      try {
        const sessions = await fetchSessions();
        console.log('Fetched Sessions:', sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }

      // Test updateSession
      const updatedSessionData = {
        // Replace with the data you want to update
      };
      try {
        const updatedSession = await updateSession(sessionId, updatedSessionData);
        console.log('Updated Session:', updatedSession);
      } catch (error) {
        console.error('Error updating session:', error);
      }

      // Test deleteSession
      try {
        const response = await deleteSession(sessionId);
        console.log('Deleted Session:', response);
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    };

    // Run the test
    testAPIFunctions();
  }, []);
  
    return (
        
<footer className="bg-[rgb(1,24,48)] text-white py-5 md:py-20">
  <div className="flex flex-wrap justify-between max-w-6xl mx-auto text-center">
 
    <div className="w-full px-4 md:w-1/3 md:px-10 mb-10 pt-5">
        <h2 className="text-2xl font-semibold uppercase mb-3">Kontakt</h2>
         <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
          <ul className="font-medium text-sm md:text-base">
            <li className="mb-4">
                <span className="block">EPOST</span>
                <p>hs@tihlde.org</p>
            </li>
            <li className="mb-4">
              <span className="block">LOKASJON</span>
              <p>c/o IDI NTNU</p>
            </li>
            <li className="mb-4">
              <span className="block">ORGANISASJONSNUMMER</span>
              <p>989 684 183</p>
            </li>
            <li className="mb-4 underline">
              <a href="https://tihlde.org/wiki/kontakt-oss/">Kontakt oss</a>
            </li>
          </ul>
    </div>
    
    <div className="w-full px-5 md:w-1/3 md:px-10 mb-10 pb-5">
        <h2 className="text-2xl font-semibold uppercase mb-3">Samarbeid</h2>
          <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
          <ul>
          <li className="mb-4">
            <a href="https://vercel.com/?utm_source=kvark&utm_campaign=oss">
             <img src="favicon.ico" alt="vercel" className="inline w-9 h-9 mr-2" />Powered by Versel
            </a>
          </li>
        </ul>
    </div>

    <div className="w-full md:w-1/3 md:p-10">
        <h2 className="text-2xl font-semibold uppercase mb-3">Sosiale medier</h2>
        <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
        <div className="grid grid-cols-[auto,auto,auto] md:gap-x-0 md:gap-y-0 gap-x-6 gap-y-4 items-center md:flex md:justify-center md:space-x-4 place-content-center">
          
          <a href="https://www.facebook.com/tihlde/" target="_blank" className="flex justify-center">
            <img src="icons/facebook.svg" alt="facebook" className="w-9 h-9 sm:g-x-2"/></a>
          
          <a href="https://www.instagram.com/tihlde/" target="_blank" className="flex justify-center">
            <img src="icons/instagram.svg" alt="instagram" className="w-9 h-9"/></a>
            
          <a href="https://twitter.com/tihlde" target="_blank" className="flex justify-center">
            <img src="icons/twitter.svg" alt="twitter" className="w-9 h-9"/></a>
            
          <a href="https://www.snapchat.com/add/tihldesnap" target="_blank" className="flex justify-center">
            <img src="icons/snapchat.svg" alt="snapchat" className="w-9 h-9"/></a>
            
          <a href="https://www.facebook.com/tihlde/" target="_blank" className="flex justify-center">
            <img src="icons/slack.svg" alt="slack" className="w-9 h-9"/></a>
            
          <a href="https://discord.com/invite/SZR9vTS" target="_blank" className="flex justify-center">
            <img src="icons/discord.svg" alt="discord" className="w-9 h-9"/></a>
          
        </div>
    </div>

    <div className="w-full px-20 md:w-full md:px-4 pt-8">
        <p>Feil på siden? <a href="https://tihlde.org/wiki/tihlde/undergrupper/index/" target="_blank" className="underline">Rapporter til index</a></p>
    </div>
    
 </div>
</footer>
  );
}

