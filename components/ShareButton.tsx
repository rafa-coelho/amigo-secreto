import React from 'react';
import * as gtag from "@/data/gtag";

interface IShareButtonProps {
  title: string;
  text: string;
  className?: string;
  onCopy?: () => void;
}

const ShareButton = ({ title, text, className, onCopy }: IShareButtonProps) => {
  const handleShare = () => {

    navigator.clipboard.writeText(text)
      .then(() => {
        gtag.event({
          action: gtag.GAEvents.ShareLink,
          label: 'Link Shared',
          category: '',
          value: ''
        });

        if(onCopy){
          onCopy();
        }
      })
      .catch(error => console.error('Erro ao copiar:', error));
  };

  return (
    <button className={className} onClick={handleShare}>{title}</button>
  );
};

export default ShareButton;
