import React, { SfButton, SfRating, SfCounter, SfLink, SfIconDelete, SfIconMoreVert } from '@storefront-ui/react';
import PropTypes from "prop-types"

export default function FreelancerCard({ freelancer = {} }) {
  const { profilePic, serviceProviderName, rating, servicesOffered } = freelancer
  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <SfLink href="#" className="block">
          <img
            src={profilePic}
            alt={serviceProviderName}
            className="object-cover h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
        </SfLink>
        <SfButton
          type="button"
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-10 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconMoreVert size="sm" />
        </SfButton>
        <SfButton
          type="button"
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconDelete size="sm"></SfIconDelete>
        </SfButton>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <SfLink href="#" variant="secondary" className="no-underline">
          {serviceProviderName}
        </SfLink>
        <div className="flex items-center pt-1">
          <SfRating size="xs" value={rating} max={5} />

          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{123}</SfCounter>
          </SfLink>
        </div>
        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
          {servicesOffered.join("• ,")}
        </p>
      </div>
    </div>
  );
}

FreelancerCard.propTypes = {
  freelancer: PropTypes.object
}