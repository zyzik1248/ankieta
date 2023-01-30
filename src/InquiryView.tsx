import React, { useReducer, useState } from 'react';

import data from './content/suppliers.json';
import { ISuppliersState, SuppliersFormStatus, SuppliersInquiryData } from './suppliers';
import { InquiryResultModal } from './suppliers/components/InquiryResultModal';
import { SuppliersInquiry } from './suppliers/components/SuppliersInquiry';
import { suppliersReducer } from './suppliers/suppliers-reducer';
import { calculateTotalScore } from './suppliers/suppliers-service';
import { guid } from './utils/data/random-number';

function InquiryView() {
  const inquiry: SuppliersInquiryData = new SuppliersInquiryData(data.categories, data.messages);
  const initialState: ISuppliersState = {
    status: SuppliersFormStatus.LOADED,
    messages: inquiry.messages,
    questions: inquiry.questions,
  };

  const [isResultVisible, setResultVisible] = useState(false);
  const [inquiryState, dispatch] = useReducer(suppliersReducer, initialState);

  const handleSelect = (questionId: guid, selectedOptionId: guid) => {
    dispatch({ type: 'selectMain', payload: { questionId, selectedOptionId } });
  };

  const handleCalculate = () => {
    const calculationResult = calculateTotalScore(inquiryState.questions);
    dispatch({ type: 'calculate', payload: calculationResult });
    setResultVisible(true);
  };

  const handleUnselect = (questionId: guid) => {
    dispatch({ type: 'unselect', payload: { questionId } });
  };

  const handleSelectNew = (questionId: guid) => {
    dispatch({ type: 'proposeNewSupplier', payload: { questionId } });
  };

  const handleUpdateNew = (questionId: guid, newSupplierName: string) => {
    dispatch({ type: 'updateSupplierName', payload: { questionId, newSupplierName } });
  };

  const handleSubmit = () => {
    console.warn('submitting form is not implemented');
  };

  const hideDialog = () => {
    setResultVisible(false);
  };

  const handleQuestionExpand = (questionId: guid, expanded: boolean) => {
    dispatch({ type: 'toggleExpand', payload: { questionId, expanded } });
  };

  return (
    <div className="App">
      {isResultVisible && inquiryState.status !== SuppliersFormStatus.LOADED && (
        <InquiryResultModal
          totalScore={inquiryState.totalScore}
          messages={inquiryState.messages}
          onClose={hideDialog}
          onSubmit={handleSubmit}
        />
      )}
      <SuppliersInquiry
        messages={inquiryState.messages}
        questions={inquiryState.questions}
        onCalculate={handleCalculate}
        onSelectNew={handleSelectNew}
        onUpdateNew={handleUpdateNew}
        onSelectNone={handleUnselect}
        onSelectSupplier={handleSelect}
        onToggleExpand={handleQuestionExpand}
      />
    </div>
  );
}

export default InquiryView;
