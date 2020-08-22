package com.event_manager.userservice.utils;

public interface Pageable {

    // number of the current page
    int getPageNumber();

    // size of the pages
    int getPageSize();
}
