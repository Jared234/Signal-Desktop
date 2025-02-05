// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { Props as MessageDetailProps } from '../../components/conversation/MessageDetail';
import { MessageDetail } from '../../components/conversation/MessageDetail';
import { getContactNameColorSelector } from '../selectors/conversations';
import { getIntl, getInteractionMode, getTheme } from '../selectors/user';
import { getMessageDetails } from '../selectors/message';
import { getPreferredBadgeSelector } from '../selectors/badges';
import { renderAudioAttachment } from './renderAudioAttachment';
import { useAccountsActions } from '../ducks/accounts';
import { useConversationsActions } from '../ducks/conversations';
import { useGlobalModalActions } from '../ducks/globalModals';
import { useLightboxActions } from '../ducks/lightbox';
import { useStoriesActions } from '../ducks/stories';

export { Contact } from '../../components/conversation/MessageDetail';
export type OwnProps = Pick<
  MessageDetailProps,
  'contacts' | 'errors' | 'message' | 'receivedAt'
>;

export function SmartMessageDetail(): JSX.Element | null {
  const getContactNameColor = useSelector(getContactNameColorSelector);
  const getPreferredBadge = useSelector(getPreferredBadgeSelector);
  const i18n = useSelector(getIntl);
  const interactionMode = useSelector(getInteractionMode);
  const messageDetails = useSelector(getMessageDetails);
  const theme = useSelector(getTheme);
  const { checkForAccount } = useAccountsActions();
  const {
    clearSelectedMessage,
    doubleCheckMissingQuoteReference,
    kickOffAttachmentDownload,
    markAttachmentAsCorrupted,
    openGiftBadge,
    popPanelForConversation,
    pushPanelForConversation,
    saveAttachment,
    showConversation,
    showExpiredIncomingTapToViewToast,
    showExpiredOutgoingTapToViewToast,
    startConversation,
  } = useConversationsActions();
  const { showContactModal, toggleSafetyNumberModal } = useGlobalModalActions();
  const { showLightbox, showLightboxForViewOnceMedia } = useLightboxActions();
  const { viewStory } = useStoriesActions();

  useEffect(() => {
    if (!messageDetails) {
      popPanelForConversation();
    }
  }, [messageDetails, popPanelForConversation]);

  if (!messageDetails) {
    return null;
  }

  const { contacts, errors, message, receivedAt } = messageDetails;

  const contactNameColor =
    message.conversationType === 'group'
      ? getContactNameColor(message.conversationId, message.author.id)
      : undefined;

  return (
    <MessageDetail
      checkForAccount={checkForAccount}
      clearSelectedMessage={clearSelectedMessage}
      contactNameColor={contactNameColor}
      contacts={contacts}
      doubleCheckMissingQuoteReference={doubleCheckMissingQuoteReference}
      errors={errors}
      getPreferredBadge={getPreferredBadge}
      i18n={i18n}
      interactionMode={interactionMode}
      kickOffAttachmentDownload={kickOffAttachmentDownload}
      markAttachmentAsCorrupted={markAttachmentAsCorrupted}
      message={message}
      openGiftBadge={openGiftBadge}
      pushPanelForConversation={pushPanelForConversation}
      receivedAt={receivedAt}
      renderAudioAttachment={renderAudioAttachment}
      saveAttachment={saveAttachment}
      sentAt={message.timestamp}
      showContactModal={showContactModal}
      showConversation={showConversation}
      showExpiredIncomingTapToViewToast={showExpiredIncomingTapToViewToast}
      showExpiredOutgoingTapToViewToast={showExpiredOutgoingTapToViewToast}
      showLightbox={showLightbox}
      showLightboxForViewOnceMedia={showLightboxForViewOnceMedia}
      startConversation={startConversation}
      theme={theme}
      toggleSafetyNumberModal={toggleSafetyNumberModal}
      viewStory={viewStory}
    />
  );
}
