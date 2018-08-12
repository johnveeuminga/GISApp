package com.abrariverbasinapp.custommapcomponent;


import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

class CustomMapView extends MapView implements OnMapReadyCallback {
    private GoogleMap map;
    private LatLng initialRegion;
    private double zoom = 10.0;
    private EventDispatcher eventDispatcher;
    private ThemedReactContext reactContext;

    public CustomMapView(ThemedReactContext context ) {
        super( context );

        this.reactContext = context;

        super.onCreate( null );
        super.onResume();
        super.getMapAsync(this);
    }


    @Override
    public void onMapReady(final GoogleMap googleMap) {
        this.map = googleMap;

        eventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();

        if( this.initialRegion != null ) {
            this.map.moveCamera(CameraUpdateFactory.newLatLngZoom( this.initialRegion, (float) this.zoom));
        }

        this.map.addMarker( new MarkerOptions().position( new LatLng(17.612651, 120.3313195)));
    }

    public void setRegion( ReadableMap map ) {
        LatLng region = new LatLng( map.getDouble("latitude"), map.getDouble("longitude"));
        Double zoom = map.getDouble( "zoom" );
        this.initialRegion = region;
        this.zoom = zoom;
    }
}