import React from 'react'
import ExcelFileReader from "../../../../src/Components/Utils/ExcelFileReader"

describe('ExcelFileReader', () => {
    it('calls onFileLoad when a file is uploaded', () => {
        const onFileLoadSpy = cy.spy().as('onFileLoadSpy')
      cy.mount(<ExcelFileReader onFileLoad={onFileLoadSpy} />);
      cy.get('[data-cy="file-button"]').selectFile("testSpiFile.xlsx");
      cy.get('@onFileLoadSpy').should('have.been.calledOnce')
    });
  });