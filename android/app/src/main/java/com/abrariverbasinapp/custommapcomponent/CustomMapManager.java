package com.abrariverbasinapp.custommapcomponent;

import com.airbnb.android.react.maps.AirMapManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.model.LatLng;

public class CustomMapManager extends ViewGroupManager<CustomMapView> {
    private static final String REACT_CLASS = "CustomMap";
    private ReactApplicationContext appContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CustomMapView createViewInstance(ThemedReactContext context) {
        return new CustomMapView(context);
    }

    @ReactProp(name="region")
    public void setRegion(CustomMapView view, ReadableMap latLng ) {
        view.setRegion( latLng );
    }

}
