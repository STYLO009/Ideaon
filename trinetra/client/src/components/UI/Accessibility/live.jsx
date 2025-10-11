// client/src/components/Accessibility/LiveRegion.jsx
import React, { useEffect, useState } from 'react';

let lastMsg = '';

export default function LiveRegion() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    // hook into window.speechSynthesis events or a global publish for detection messages
    function handler(e) {
      // simple pub: window.trinetraAnnounce(text)
      // not used automatically, but detector invoked speak() which uses speech and we also set this
    }
    window.trinetraAnnounce = (text) => {
      if (text && text !== lastMsg) {
        lastMsg = text;
        setMsg(text);
        // clear after a short while so screen readers will re-announce later messages
        setTimeout(() => setMsg(''), 2000);
      }
    };
    return () => { window.trinetraAnnounce = null; };
  }, []);

  return (
    <div aria-live="polite" aria-atomic="true" style={{position:'absolute', left:-9999}}>
      {msg}
    </div>
  );
}
