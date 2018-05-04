package com.mti;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.rnfingerprint.FingerprintAuthPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }



  //@Override
  protected List<ReactPackage> getPackages() {

    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FingerprintAuthPackage(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNFirebasePackage(),
            //new SplashScreenReactPackage(),
            //new BlurViewPackage(),
            new VectorIconsPackage(),
            new RNTextInputMaskPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new MapsPackage()
    );
  }


//  @Override
//  public ReactNativeHost getReactNativeHost() {
//
//      return mReactNativeHost;
//  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
