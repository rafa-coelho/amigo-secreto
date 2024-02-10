import React from 'react';
import * as gtag from "@/data/gtag";

interface IShareButtonProps {
  title: string;
  text: string;
  className?: string;
}

const ShareButton = ({ title, text, className }: IShareButtonProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text
      })
        .then(() => {
          gtag.event({
            action: gtag.GAEvents.ShareLink,
            label: 'Link Shared',
            category: '',
            value: ''
          });
        })
        .catch(error => console.error('Erro ao compartilhar:', error));
    } else {
      console.error('Web Share API não é suportada neste navegador.');
    }
  };

  return (
    <button className={className} onClick={handleShare}>{title}</button>
  );
};

export default ShareButton;
