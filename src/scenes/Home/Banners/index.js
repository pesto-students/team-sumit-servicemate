import React from 'react';
import { SfButton } from '@storefront-ui/react';
import classNames from 'classnames';

const displayDetails = [
  {
    image: 'https://www.walkerelectricalltd.co.uk/wp-content/uploads/2016/10/electrician-factory-400x400.jpg',
    title: 'Get 20% off on your first service',
    subtitle: 'Bright Sparks for Your Electrical Needs',
    description: 'Professional electrical services for your home',
    buttonText: 'Discover now',
    reverse: false,
    backgroundColor: 'bg-negative-200',
    titleClass: 'md:typography-display-2',
    subtitleClass: 'md:typography-headline-6',
    descriptionClass: 'md:typography-text-lg',
  },
  {
    image: 'https://www.4servicepros.com/wp-content/uploads/2022/10/Drain-Cleaning-Services-Sink-Pipes-House.jpg',
    title: 'Skilled plumbers to fix your plumbing issues',
    subtitle: 'Flush Away Your Plumbing Worries',
    description: 'Explore the great outdoors with our backpacks',
    buttonText: 'Discover now',
    reverse: true,
    backgroundColor: 'bg-warning-200',
  },
  {
    image: 'https://www.thimble.com/wp-content/uploads/2021/02/Carpenters-400x400.jpg',
    title: 'Custom carpentry solutions for your home',
    subtitle: 'Woodworking Wonders',
    description: 'Special offer: Free consultation and estimate',
    buttonText: 'Discover now',
    reverse: false,
    backgroundColor: 'bg-secondary-200',
  },
];

export default function Banners() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]">
      {displayDetails.map(
        ({ image, title, subtitle, description, buttonText, backgroundColor, reverse, titleClass, subtitleClass }) => (
          <div
            key={title}
            className={classNames(
              'relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full',
              backgroundColor,
            )}
          >
            <a
              className="absolute w-full h-full z-1 focus-visible:outline focus-visible:rounded-lg"
              aria-label={title}
              href="#"
            />
            <div
              className={classNames('flex justify-between overflow-hidden grow', {
                'flex-row-reverse': reverse,
              })}
            >
              <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
                <p
                  className={classNames('uppercase typography-text-xs block font-bold tracking-widest', subtitleClass)}
                >
                  {subtitle}
                </p>
                <h2 className={classNames('mb-4 mt-2 font-bold typography-display-3', titleClass)}>{title}</h2>
                <p className="typography-text-base block mb-4">{description}</p>
                <SfButton className="!bg-black">{buttonText}</SfButton>
              </div>
              <img src={image} alt={title} className="w-1/2 self-end object-contain" />
            </div>
          </div>
        ),
      )}
    </div>
  );
}