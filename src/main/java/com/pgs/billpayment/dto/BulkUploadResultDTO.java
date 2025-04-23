package com.pgs.billpayment.dto;

import java.util.List;


import java.util.List;

public class BulkUploadResultDTO {
    private int successCount;
    private List<String> errors;

    public int getSuccessCount() {
        return successCount;
    }
    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }
    public List<String> getErrors() {
        return errors;
    }
    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
