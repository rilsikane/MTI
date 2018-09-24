package com.mti.insurance.friends;

import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
public class MainApplication extends NavigationApplication implements ShareApplication{

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }



  //@Override
  protected List<ReactPackage> getPackages() {

    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNSharePackage(),
            new MapsPackage(),
            new RNFusedLocationPackage(),
//            new FabricPackage(),
            new FastImageViewPackage(),
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
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
    );
  }


//  @Override
//  public ReactNativeHost getReactNativeHost() {
//
//      return mReactNativeHost;
//  }
@Override
public String getFileProviderAuthority() {
  return "com.mti.insurance.friends.provider";
}

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}


