import React, { useState } from 'react';
import { SfAccordionItem } from '@storefront-ui/react';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';

const accordionItems = [
  {
    id: 'acc-1',
    summary: 'Payment Methods',
    details:
      'At ServiceMate, we offer hassle-free payment options, including secure online transactions, to ensure convenient settlement for your electrical and plumbing services in Bangalore, India.',
  },
  {
    id: 'acc-2',
    summary: 'Track Appointment',
    details:
      'Track your service appointment every step of the way with ServiceMate. Stay informed about your electrician or plumber\'s arrival time, so you can plan your day efficiently.',
  },
  {
    id: 'acc-3',
    summary: 'Service Feedback',
    details:
      'Your opinion matters! Share your feedback after your household service is completed in Bangalore through ServiceMate, helping us continually improve and provide top-notch service.',
  },
  {
    id: 'acc-4',
    summary: 'Security & Fraud',
    details:
      'Your security is our priority at ServiceMate. We employ robust security measures to protect your data and transactions. Rest assured, we diligently monitor for any fraudulent activity to ensure a safe experience while booking electricians and plumbers in Bangalore, India.',
  }, {
    id: 'acc-5',
    summary: 'Feedback',
    details:
      'We value your feedback! Your insights help us enhance our electrician and plumber services in Bangalore. Share your thoughts with us, and together, we\'ll make ServiceMate even better for you.',
  }, {
    id: 'acc-6',
    summary: 'Contact Us',
    details:
      'Got questions or need assistance? Our dedicated support team is here for you. Reach out to ServiceMate in Bangalore, India, via email, phone, or the contact form below. We\'re ready to help you with your household service needs.',
  },
];

export default function AccordionItems() {
  const [isTransitioning, setTransitioning] = useState(false);
  const [opened, setOpened] = useState([]);

  const isOpen = (id) => opened.includes(id);

  const handleToggle = (id) => (open) => {
    setTransitioning(true);
    if (open) {
      setOpened((current) => [...current, id]);
    } else {
      setOpened((current) => current.filter((item) => item !== id));
    }
  };

  const handleStopTransition = () => {
    setTransitioning(false);
  };

  return (
    <div className="border border-neutral-200 rounded-md divide-y text-neutral-900">
      {accordionItems.map(({ id, summary, details }) => (
        <SfAccordionItem
          key={id}
          summary={<p className="p-4 font-medium hover:bg-neutral-100 active:neutral-100">{summary}</p>}
          onToggle={handleToggle(id)}
          open={isTransitioning || isOpen(id)}
        >
          <Transition
            in={isOpen(id)}
            timeout={300}
            onEntered={handleStopTransition}
            onExited={handleStopTransition}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={classNames('grid transition-[grid-template-rows] duration-300 grid-rows-[0fr]', {
                  '!grid-rows-[1fr]': state === 'entering' || state === 'entered',
                  'grid-rows-[0fr]': state === 'exiting',
                })}
              >
                <div className="overflow-hidden">
                  <p className="p-4">{details}</p>
                </div>
              </div>
            )}
          </Transition>
        </SfAccordionItem>
      ))}
    </div>
  );
}
