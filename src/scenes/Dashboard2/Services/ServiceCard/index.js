import React, { SfButton, SfLink, SfIconDelete, SfIconMoreVert } from '@storefront-ui/react';
import PropTypes from 'prop-types';

// const dummy = {
//     "_id": "64fcd8300de381301acd5314",
//     "categories": [
//         {
//             "images": "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
//             "_id": "64aa8f49e81a2847240e8b65",
//             "image": "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
//             "name": "Electrician",
//             "value": "electrician"
//         }
//     ],
//     "services": [],
//     "address": [],
//     "serviceProvider": "vendor4",
//     "serviceProviderId": "64fb22d3ff5a5aa4df422ef2",
//     "charges": 1000,
//     "servicesOffered": [
//         "Service1",
//         "Service2",
//         "Service3"
//     ],
//     "__v": 2
// }
export default function ServiceCard({ service = {} }) {
    const { categories = [], servicesOffered = [] } = service;
    return (
        <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
            <div className="relative">
                <SfLink href="#" className="block">
                    <img
                        src={categories[0]?.image}
                        alt={categories[0]?.name}
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
                    {categories[0]?.name}
                </SfLink>
                {/* <div className="flex items-center pt-1">
          <SfRating size="xs" value={rating} max={5} />

          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{123}</SfCounter>
          </SfLink>
        </div> */}
                <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                    {servicesOffered.join(' •')}
                </p>
            </div>
        </div>
    );
}

ServiceCard.propTypes = {
    service: PropTypes.array
};